import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class SuccessMessage extends Component {
  state = {
    open: true
  };

  onClose = () => this.setState({open: false});

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.onClose}
        message="Changes saved"
      />
    );
  }
}

export default SuccessMessage;
