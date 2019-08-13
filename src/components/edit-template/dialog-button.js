import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import {Dialog} from '@material-ui/core';

export default function DialogButton(props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  function openDialog() {
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  return (
    <Fragment>
      {props.renderButton(openDialog)}
      <Dialog fullWidth scroll="body" open={dialogOpen} onClose={closeDialog}>
        {props.children(closeDialog)}
      </Dialog>
    </Fragment>
  );
}

DialogButton.propTypes = {
  renderButton: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
};
