import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from './form';
import FormField from './form-field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logIn} from '../actions/user';

class LoginForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  onSubmit = event =>
    this.props.dispatch(
      logIn([event.target.email.value, event.target.password.value])
    );

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <FormField autoFocus label="Email address" name="email" />
          <FormField label="Password" name="password" type="password" />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onCancel}>Cancel</Button>
          <Button disabled={this.props.loading} color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading
});

export default connect(mapStateToProps)(LoginForm);
