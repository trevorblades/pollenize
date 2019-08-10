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
  TextField,
  Typography
} from '@material-ui/core';
import {CANDIDATE_FRAGMENT} from '../../utils/queries';
import {format} from 'date-fns/esm';
import {makeStyles} from '@material-ui/styles';
import {size} from 'polished';
import {useMutation} from '@apollo/react-hooks';
import {withProps} from 'recompose';

const FormField = withProps({
  fullWidth: true,
  margin: 'normal'
})(TextField);

const useStyles = makeStyles({
  avatarRoot: {
    ...size(160),
    cursor: 'pointer'
  }
});

const UPDATE_CANDIDATE = gql`
  mutation UpdateCandidate(
    $id: ID!
    $name: String
    $partyEn: String
    $partyFr: String
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
  const [active, setActive] = useState(props.candidate.active);
  const [updateCandidate, {loading, error}] = useMutation(UPDATE_CANDIDATE, {
    onCompleted: props.onClose,
    variables: {
      id: props.candidate.id,
      active
    }
  });

  function handleSubmit(event) {
    event.preventDefault();

    const {
      name,
      partyEn,
      partyFr,
      birthDate,
      hometown,
      bioEn,
      bioFr
    } = event.target;

    updateCandidate({
      variables: {
        name: name.value,
        partyEn: partyEn.value,
        partyFr: partyFr.value,
        birthDate: birthDate.value,
        hometown: hometown.value,
        bioEn: bioEn.value,
        bioFr: bioFr.value
      }
    });
  }

  function handleActiveChange(event) {
    setActive(event.target.checked);
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle disableTypography>
        <Typography variant="overline">Editing candidate</Typography>
        <Typography variant="h4">{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        {error && (
          <DialogContentText color="error">{error.message}</DialogContentText>
        )}
        <Avatar
          component="label"
          htmlFor="file"
          classes={{root: avatarRoot}}
          src={props.candidate.portrait}
        />
        <input hidden type="file" id="file" />
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
            <input type="color" defaultValue={props.candidate.color} />
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
          defaultValue={props.candidate.name}
        />
        <FormField
          label="Party (EN)"
          name="partyEn"
          defaultValue={props.candidate.partyEn}
        />
        <FormField
          label="Parti (FR)"
          name="partyFr"
          defaultValue={props.candidate.partyFr}
        />
        <FormField
          label="Birth date"
          name="birthDate"
          type="date"
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
          defaultValue={props.candidate.hometown}
        />
        <FormField
          multiline
          label="Bio (EN)"
          name="bioEn"
          defaultValue={props.candidate.bioEn}
        />
        <FormField
          multiline
          label="La biographie (FR)"
          name="bioFr"
          defaultValue={props.candidate.bioFr}
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

CandidateForm.propTypes = {
  title: PropTypes.string.isRequired,
  candidate: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};
