import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Organizations from './organizations';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {FormField} from '../../../form';
import {
  create as createInvitation,
  reset as resetInvitation
} from '../../../../actions/invitation';
import {connect} from 'react-redux';

class InviteForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  state = {
    organization: ''
  };

  componentWillUnmount() {
    this.props.dispatch(resetInvitation());
  }

  onSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    this.props.dispatch(createInvitation(formData));
  };

  onOrganizationChange = event =>
    this.setState({organization: event.target.value});

  render() {
    return (
      <form onSubmit={this.onSubmit}>
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
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.invitation.loading
});

export default connect(mapStateToProps)(InviteForm);
