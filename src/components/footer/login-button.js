import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import LoginForm from '../login-form';
import React, {Component, Fragment} from 'react';

class LoginButton extends Component {
  state = {
    open: false
  };

  onButtonClick = () => this.setState({open: true});

  closeDialog = () => this.setState({open: false});

  render() {
    return (
      <Fragment>
        <ButtonBase {...this.props} onClick={this.onButtonClick} />
        <Dialog fullWidth open={this.state.open} onClose={this.closeDialog}>
          <LoginForm onClose={this.closeDialog} />
        </Dialog>
      </Fragment>
    );
  }
}

export default LoginButton;
