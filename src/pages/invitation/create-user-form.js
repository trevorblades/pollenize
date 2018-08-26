import Button from '@material-ui/core/Button';
import Form, {FormField} from '../../components/form';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {create as createUser} from '../../actions/user';

const Fields = styled.div({marginBottom: theme.spacing.unit * 2});
const DisabledField = withProps({disabled: true})(FormField);
const PasswordField = withProps({type: 'password'})(FormField);
const GridItem = withProps({
  item: true,
  xs: 4
})(Grid);

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
        <Fields>
          <Grid container>
            <GridItem>
              <DisabledField label="Name" value={name} />
            </GridItem>
            <GridItem>
              <DisabledField label="Email" value={email} />
            </GridItem>
            <GridItem>
              <DisabledField label="Organization" value={organization.name} />
            </GridItem>
          </Grid>
          <PasswordField name="password" label="Choose a password" />
          <PasswordField
            name="password_confirm"
            label="Confirm your password"
          />
        </Fields>
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
