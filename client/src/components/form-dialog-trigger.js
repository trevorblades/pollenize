import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';

class FormDialogTrigger extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    closeOnSuccess: PropTypes.bool,
    form: PropTypes.element.isRequired
  };

  state = {
    dialogOpen: false
  };

  onClick = event => {
    event.currentTarget.blur();
    this.setState({dialogOpen: true});
  };

  closeDialog = () => this.setState({dialogOpen: false});

  render() {
    return (
      <Fragment>
        {React.cloneElement(this.props.children, {onClick: this.onClick})}
        <Dialog
          fullWidth
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
        >
          {React.cloneElement(this.props.form, {
            onCancel: this.closeDialog,
            onSuccess: this.props.closeOnSuccess ? this.closeDialog : null
          })}
        </Dialog>
      </Fragment>
    );
  }
}

export default FormDialogTrigger;
