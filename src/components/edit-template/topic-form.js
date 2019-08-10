import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  DialogActions,
  DialogTitle,
  Typography
} from '@material-ui/core';

export default function TopicForm(props) {
  return (
    <form>
      <DialogTitle disableTypography>
        <Typography variant="overline">Editing topic</Typography>
        <Typography variant="h4">{props.title}</Typography>
      </DialogTitle>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </form>
  );
}

TopicForm.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
