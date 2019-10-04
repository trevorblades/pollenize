import LanguageFields from './language-fields';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import gql from 'graphql-tag';
import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
  Typography,
  makeStyles
} from '@material-ui/core';
import {CANDIDATE_FRAGMENT} from '../../utils/queries';
import {FormField} from '../common';
import {format} from 'date-fns/esm';
import {getMessageInputs, uploadImage, useFileHandler} from '../../utils';
import {size} from 'polished';
import {useMutation} from '@apollo/react-hooks';

const useStyles = makeStyles({
  avatarRoot: {
    ...size(160),
    '&:not([disabled])': {
      cursor: 'pointer'
    },
    '&[disabled]': {
      pointerEvents: 'none'
    }
  }
});

const UPDATE_CANDIDATE = gql`
  mutation UpdateCandidate(
    $id: ID!
    $name: String!
    $parties: [MessageInput]!
    $color: String!
    $portrait: String
    $birthDate: String!
    $hometown: String!
    $bios: [MessageInput]!
    $active: Boolean!
  ) {
    updateCandidate(
      id: $id
      name: $name
      parties: $parties
      color: $color
      portrait: $portrait
      birthDate: $birthDate
      hometown: $hometown
      bios: $bios
      active: $active
    ) {
      ...CandidateFragment
    }
  }
  ${CANDIDATE_FRAGMENT}
`;

export default function CandidateForm(props) {
  const {avatarRoot} = useStyles();
  const [dataUrl, handleFileChange] = useFileHandler(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [active, setActive] = useState(props.candidate.active);
  const [updateCandidate, {loading, error}] = useMutation(UPDATE_CANDIDATE, {
    onCompleted: props.onClose,
    variables: {
      id: props.candidate.id,
      active
    }
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const {name, color, birthDate, hometown} = event.target;
    const variables = {
      name: name.value,
      color: color.value,
      parties: getMessageInputs(event.target['party[]']),
      birthDate: birthDate.value || null,
      hometown: hometown.value,
      bios: getMessageInputs(event.target['bio[]']),
      active
    };

    const [file] = event.target.file.files;
    if (file) {
      setUploading(true);

      try {
        variables.portrait = await uploadImage(file);
      } catch (error) {
        setUploadError(error);
        setUploading(false);
        return;
      }

      setUploadError(null);
      setUploading(false);
    }

    updateCandidate({variables});
  }

  function handleActiveChange(event) {
    setActive(event.target.checked);
  }

  const disabled = uploading || loading;
  const anyError = uploadError || error;
  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle disableTypography>
        <Typography variant="overline">Editing candidate</Typography>
        <Typography variant="h4">{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        {anyError && (
          <DialogContentText color="error">
            {anyError.message}
          </DialogContentText>
        )}
        <Avatar
          disabled={disabled}
          component="label"
          htmlFor="file"
          classes={{root: avatarRoot}}
          src={dataUrl || props.candidate.portrait}
        />
        <input
          hidden
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Box mt={2} mb={1}>
          <label>
            <Typography
              gutterBottom
              display="block"
              variant="caption"
              color="textSecondary"
            >
              Primary color
            </Typography>
            <input
              name="color"
              type="color"
              disabled={disabled}
              defaultValue={props.candidate.color || '#ffffff'}
            />
            <Typography display="inline" style={{marginLeft: 8}}>
              Select a color
            </Typography>
          </label>
        </Box>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              name="active"
              checked={active}
              onChange={handleActiveChange}
            />
          }
          label={`Status: ${active ? 'Active' : 'Inactive'}`}
        />
        <FormField
          required
          label="Name"
          name="name"
          disabled={disabled}
          defaultValue={props.candidate.name}
        />
        <LanguageFields
          disabled={disabled}
          languages={props.languages}
          messages={props.candidate.parties}
          label="Party"
          name="party"
        />
        <FormField
          label="Birth date"
          name="birthDate"
          type="date"
          disabled={disabled}
          InputLabelProps={{
            shrink: true
          }}
          defaultValue={
            props.candidate.birthDate &&
            format(Number(props.candidate.birthDate), 'yyyy-MM-dd')
          }
        />
        <FormField
          label="Hometown"
          name="hometown"
          disabled={disabled}
          defaultValue={props.candidate.hometown}
        />
        <LanguageFields
          multiline
          disabled={disabled}
          languages={props.languages}
          messages={props.candidate.bios}
          label="Bio"
          name="bio"
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

CandidateForm.propTypes = {
  title: PropTypes.string.isRequired,
  candidate: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  languages: PropTypes.array.isRequired
};
