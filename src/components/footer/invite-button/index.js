import ButtonBase from '@material-ui/core/ButtonBase';
import DialogTrigger from '../../dialog-trigger';
import InviteForm from './invite-form';
import React from 'react';

const InviteButton = props => (
  <DialogTrigger
    renderContent={closeDialog => <InviteForm onCancel={closeDialog} />}
  >
    <ButtonBase {...props} />
  </DialogTrigger>
);

export default InviteButton;
