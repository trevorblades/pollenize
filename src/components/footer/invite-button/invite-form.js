import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class InviteForm extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired
  };

  onSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <DialogActions>
          <Button onClick={this.props.onCancel}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    );
  }
}

export default InviteForm;
