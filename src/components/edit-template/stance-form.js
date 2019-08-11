import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core';
import {FormField} from '../common';
import {MdClose} from 'react-icons/md';

export default function StanceForm(props) {
  return (
    <form>
      <DialogTitle disableTypography>
        <Typography variant="overline">Editing stance</Typography>
        <Typography variant="h4">{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <FormField
          multiline
          label="Text (EN)"
          name="textEn"
          defaultValue={props.stance.textEn}
        />
        <FormField
          multiline
          label="Texte (FR)"
          name="textFr"
          defaultValue={props.stance.textEn}
        />
        <Typography variant="h6" style={{marginTop: 16}}>
          Sources
        </Typography>
        {props.stance.sources.map(source => (
          <TextField
            fullWidth
            margin="dense"
            defaultValue={source.url}
            key={source.id}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <MdClose />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </form>
  );
}

StanceForm.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  stance: PropTypes.object.isRequired
};
