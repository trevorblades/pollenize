import PropTypes from 'prop-types';
import React from 'react';
import gql from 'graphql-tag';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@material-ui/core';
import {FormField} from '../common';
import {TOPIC_FRAGMENT} from '../../utils/queries';
import {useMutation} from '@apollo/react-hooks';

const UPDATE_TOPIC = gql`
  mutation UpdateTopic(
    $id: ID!
    $titleEn: String
    $titleFr: String
    $descriptionEn: String
    $descriptionFr: String
  ) {
    updateTopic(
      id: $id
      titleEn: $titleEn
      titleFr: $titleFr
      descriptionEn: $descriptionEn
      descriptionFr: $descriptionFr
    ) {
      ...TopicFragment
    }
  }
  ${TOPIC_FRAGMENT}
`;

export default function TopicForm(props) {
  const [updateTopic, {loading, error}] = useMutation(UPDATE_TOPIC, {
    onCompleted: props.onClose,
    variables: {
      id: props.topic.id
    }
  });

  function handleSubmit(event) {
    event.preventDefault();

    const {titleEn, titleFr, descriptionEn, descriptionFr} = event.target;
    updateTopic({
      variables: {
        titleEn: titleEn.value,
        titleFr: titleFr.value,
        descriptionEn: descriptionEn.value,
        descriptionFr: descriptionFr.value
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle disableTypography>
        <Typography variant="overline">Editing topic</Typography>
        <Typography variant="h4">{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        {error && (
          <DialogContentText color="error">{error.message}</DialogContentText>
        )}
        <FormField
          label="Title (EN)"
          name="titleEn"
          defaultValue={props.topic.titleEn}
        />
        <FormField
          label="Titre (FR)"
          name="titleFr"
          defaultValue={props.topic.titleFr}
        />
        <FormField
          multiline
          label="Description (EN)"
          name="descriptionEn"
          defaultValue={props.topic.descriptionEn}
        />
        <FormField
          multiline
          label="Description (FR)"
          name="descriptionFr"
          defaultValue={props.topic.descriptionFr}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button type="submit" color="primary" disabled={loading}>
          Save changes
        </Button>
      </DialogActions>
    </form>
  );
}

TopicForm.propTypes = {
  title: PropTypes.string.isRequired,
  topic: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};
