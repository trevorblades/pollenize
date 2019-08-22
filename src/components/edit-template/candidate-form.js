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
import {size} from 'polished';
import {uploadImage, useFileHandler} from '../../utils';
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
    $name: String
    $partyEn: String
    $partyFr: String
    $color: String
    $portrait: String
    $birthDate: String
    $hometown: String
    $bioEn: String
    $bioFr: String
    $active: Boolean
  ) {
    updateCandidate(
      id: $id
      name: $name
      partyEn: $partyEn
      partyFr: $partyFr
      color: $color
      portrait: $portrait
      birthDate: $birthDate
      hometown: $hometown
      bioEn: $bioEn
      bioFr: $bioFr
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

    const {
      file,
      name,
      color,
      partyEn,
      partyFr,
      birthDate,
      hometown,
      bioEn,
      bioFr
    } = event.target;

    const variables = {
      name: name.value,
      color: color.value,
      partyEn: partyEn.value,
      partyFr: partyFr.value,
      birthDate: birthDate.value || null,
      hometown: hometown.value,
      bioEn: bioEn.value,
      bioFr: bioFr.value,
      active
    };

    if (file.files.length) {
      setUploading(true);

      try {
        variables.portrait = await uploadImage(file.files[0]);
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
        <FormField
          label="Party (EN)"
          name="partyEn"
          disabled={disabled}
          defaultValue={props.candidate.partyEn}
        />
        <FormField
          label="Parti (FR)"
          name="partyFr"
          disabled={disabled}
          defaultValue={props.candidate.partyFr}
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
        <FormField
          multiline
          label="Bio (EN)"
          name="bioEn"
          disabled={disabled}
          defaultValue={props.candidate.bioEn}
        />
        <FormField
          multiline
          label="La biographie (FR)"
          name="bioFr"
          disabled={disabled}
          defaultValue={props.candidate.bioFr}
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
  onClose: PropTypes.func.isRequired
};
