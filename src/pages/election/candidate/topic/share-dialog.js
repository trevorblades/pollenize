import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class ShareDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>Share this position</DialogTitle>
        <DialogContent>Coming soon</DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Done</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ShareDialog;
