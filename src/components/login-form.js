import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {FormField} from './form';

class LoginForm extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired
  };

  onSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <FormField label="Email address" name="email" />
          <FormField label="Password" name="password" type="password" />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    );
  }
}

export default LoginForm;
