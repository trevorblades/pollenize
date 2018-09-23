import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from '../../../form';
import FormField from '../../../form-field';
import Organizations from './organizations';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import querystring from 'querystring';
import {connect} from 'react-redux';
import {
  create as createInvitation,
  reset as resetInvitation
} from '../../../../actions/invitation';

class InviteForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    invitation: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  state = {
    organization: ''
  };

  componentWillUnmount() {
    this.props.dispatch(resetInvitation());
  }

  onSubmit = event =>
    this.props.dispatch(
      createInvitation({
        email: event.target.email.value,
        name: event.target.name.value,
        organization_id: this.state.organization
      })
    );

  onOrganizationChange = event =>
    this.setState({organization: event.target.value});

  render() {
    if (this.props.invitation) {
      const query = querystring.stringify({token: this.props.invitation});
      return (
        <Fragment>
          <DialogTitle>Success!</DialogTitle>
          <DialogContent>
            <FormField
              readOnly
              label="Invitation URL"
              value={`${window.location.origin}/invitation?${query}`}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onCancel}>Done</Button>
          </DialogActions>
        </Fragment>
      );
    }

    return (
      <Form onSubmit={this.onSubmit}>
        <DialogTitle>Invite a user</DialogTitle>
        <DialogContent>
          <FormField autoFocus name="email" label="Email address" />
          <FormField name="name" label="Name" />
          <Organizations
            onChange={this.onOrganizationChange}
            value={this.state.organization}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={this.props.loading} onClick={this.props.onCancel}>
            Cancel
          </Button>
          <Button disabled={this.props.loading} type="submit">
            Submit
          </Button>
        </DialogActions>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  invitation: state.invitation.data,
  loading: state.invitation.loading
});

export default connect(mapStateToProps)(InviteForm);
