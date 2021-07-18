import LanguageFields from './language-fields';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import gql from 'graphql-tag';
import {
  Box,
  Button,
  CardActionArea,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  styled
} from '@material-ui/core';
import {FormField} from '../common';
import {TOPIC_FRAGMENT} from '../../utils/queries';
import {getMessageInputs, uploadImage, useFileHandler} from '../../utils';
import {size} from 'polished';
import {useMutation} from '@apollo/client';

const StyledImage = styled('img')({
  ...size('100%'),
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0
});

const UPDATE_TOPIC = gql`
  mutation UpdateTopic(
    $id: ID!
    $titles: [MessageInput]!
    $descriptions: [MessageInput]!
    $image: String
    $order: Int!
  ) {
    updateTopic(
      id: $id
      titles: $titles
      descriptions: $descriptions
      image: $image
      order: $order
    ) {
      ...TopicFragment
    }
  }
  ${TOPIC_FRAGMENT}
`;

export default function TopicForm(props) {
  const [dataUrl, handleFileChange] = useFileHandler();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [updateTopic, {loading, error}] = useMutation(UPDATE_TOPIC, {
    onCompleted: props.onClose,
    variables: {
      id: props.topic.id
    }
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const variables = {
      titles: getMessageInputs(event.target['title[]']),
      descriptions: getMessageInputs(event.target['description[]']),
      order: Number(event.target.order.value)
    };

    const [file] = event.target.file.files;
    if (file) {
      setUploading(true);

      try {
        variables.image = await uploadImage(file);
      } catch (error) {
        setUploadError(error);
        setUploading(false);
        return;
      }

      setUploadError(null);
      setUploading(false);
    }

    updateTopic({variables});
  }

  const disabled = uploading || loading;
  const anyError = uploadError || error;
  const image = dataUrl || props.topic.image;
  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle disableTypography>
        <Typography variant="overline">Editing topic</Typography>
        <Typography variant="h4">{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        {anyError && (
          <DialogContentText color="error">
            {anyError.message}
          </DialogContentText>
        )}
        <Box my={1}>
          <Typography
            gutterBottom
            variant="caption"
            display="block"
            color="textSecondary"
            component="label"
          >
            Topic illustration
          </Typography>
          <CardActionArea component="label" disabled={disabled}>
            <Box
              height={200}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="grey.200"
              position="relative"
            >
              <Typography variant="subtitle1">Upload an image</Typography>
              {image && <StyledImage src={image} />}
            </Box>
            <input
              hidden
              accept="image/*"
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </CardActionArea>
        </Box>
        <LanguageFields
          disabled={disabled}
          languages={props.languages}
          messages={props.topic.titles}
          label="Title"
          name="title"
        />
        <LanguageFields
          multiline
          disabled={disabled}
          languages={props.languages}
          messages={props.topic.descriptions}
          label="Description"
          name="description"
        />
        <FormField
          label="Order"
          name="order"
          type="number"
          helperText="Topics are sorted from highest to lowest order number"
          disabled={disabled}
          defaultValue={props.topic.order}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button type="submit" color="primary" disabled={disabled}>
          Save changes
        </Button>
      </DialogActions>
    </form>
  );
}

TopicForm.propTypes = {
  title: PropTypes.string.isRequired,
  topic: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  languages: PropTypes.array.isRequired
};
