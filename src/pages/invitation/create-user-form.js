import Button from '@material-ui/core/Button';
import Form, {FormField} from '../../components/form';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {create as createUser} from '../../actions/user';

const DisabledField = withProps({disabled: true})(FormField);

class CreateUserForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    invitation: PropTypes.object.isRequired
  };

  onSubmit = event =>
    this.props.dispatch(
      createUser({
        password: event.target.password.value,
        password_confirm: event.target.password_confirm.value,
        token: this.props.invitation.token
      })
    );

  render() {
    const {email, name, organization} = this.props.invitation;
    return (
      <Form onSubmit={this.onSubmit}>
        <DisabledField label="Email" value={email} />
        <DisabledField label="Name" value={name} />
        <DisabledField label="Organization" value={organization.name} />
        <FormField name="password" label="Choose a password" />
        <FormField name="password_confirm" label="Confirm your password" />
        <Button color="primary" variant="raised" size="large" type="submit">
          Create account
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading
});

export default connect(mapStateToProps)(CreateUserForm);
