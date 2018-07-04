import ButtonBase from '@material-ui/core/ButtonBase';
import DialogTrigger from '../dialog-trigger';
import LoginForm from '../login-form';
import React from 'react';

const LoginButton = props => (
  <DialogTrigger
    renderContent={closeDialog => <LoginForm onCancel={closeDialog} />}
  >
    <ButtonBase {...props} />
  </DialogTrigger>
);

export default LoginButton;
