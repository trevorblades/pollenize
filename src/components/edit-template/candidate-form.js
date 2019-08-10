import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';
import {format} from 'date-fns/esm';
import {makeStyles} from '@material-ui/styles';
import {size} from 'polished';
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

export default function CandidateForm(props) {
  const {avatarRoot} = useStyles();
  const [active, setActive] = useState(props.candidate.active);

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleActiveChange(event) {
    setActive(event.target.checked);
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle disableTypography>
        <Typography variant="overline">Editing</Typography>
        <Typography variant="h4">{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
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
        <Button type="submit" color="primary">
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
