import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Select from '@material-ui/core/Select';
import {FormField, formFieldProps} from '../../form';
import {load as loadOrganizations} from '../../../actions/organizations';
import {connect} from 'react-redux';

class InviteForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  state = {
    organization: ''
  };

  componentDidMount() {
    this.props.dispatch(loadOrganizations());
  }

  onSubmit = event => {
    event.preventDefault();
  };

  onOrganizationChange = event =>
    this.setState({organization: event.target.value});

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <DialogTitle>Invite a user</DialogTitle>
        <DialogContent>
          <FormField autoFocus name="email" label="Email address" />
          <FormControl {...formFieldProps}>
            <InputLabel>Organization</InputLabel>
            <Select
              disabled={
                !this.props.organizations.length ||
                this.props.loadingOrganizations
              }
              value={this.state.organization}
              onChange={this.onOrganizationChange}
            >
              {this.props.organizations.map(organization => (
                <MenuItem key={organization.id} value={organization.id}>
                  {organization.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onCancel}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loadingOrganizations: state.organizations.loading,
  organizations: state.organizations.data
});

export default connect(mapStateToProps)(InviteForm);
