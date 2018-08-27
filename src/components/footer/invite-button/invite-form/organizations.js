import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Select from '@material-ui/core/Select';
import {formFieldProps} from '../../../form-field';
import {load as loadOrganizations} from '../../../../actions/organizations';
import {connect} from 'react-redux';

class Organizations extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    organizations: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  };

  componentDidMount() {
    this.props.dispatch(loadOrganizations());
  }

  render() {
    return (
      <FormControl {...formFieldProps}>
        <InputLabel>Organization</InputLabel>
        <Select
          disabled={!this.props.organizations.length || this.props.loading}
          value={this.props.value}
          onChange={this.props.onChange}
        >
          {this.props.organizations.map(organization => (
            <MenuItem key={organization.id} value={organization.id}>
              {organization.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.organizations.loading,
  organizations: state.organizations.data
});

export default connect(mapStateToProps)(Organizations);
