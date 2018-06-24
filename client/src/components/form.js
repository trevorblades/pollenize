import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from 'react-emotion';
import theme from '../theme';

const DeleteButton = styled(Button)({
  marginRight: 'auto',
  color: theme.palette.error.main
});

const verbs = [['Create', 'Creating'], ['Save', 'Saving']];
class Form extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    editing: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    noun: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(event);
  };

  renderSubmitButtonText() {
    const verb = verbs[Number(this.props.editing)][Number(this.props.loading)];
    return `${verb} ${this.props.noun}${this.props.loading ? '...' : ''}`;
  }

  render() {
    const verb = verbs[Number(this.props.editing)][Number(this.props.loading)];
    return (
      <form onSubmit={this.onSubmit}>
        <DialogTitle>
          {this.props.editing ? 'Edit' : 'Add'} a {this.props.noun}
        </DialogTitle>
        <DialogContent>{this.props.children}</DialogContent>
        <DialogActions>
          {this.props.editing && (
            <DeleteButton
              disabled={this.props.loading}
              onClick={this.props.onDelete}
            >
              Delete
            </DeleteButton>
          )}
          <Button disabled={this.props.loading} onClick={this.props.onCancel}>
            Cancel
          </Button>
          <Button disabled={this.props.loading} type="submit">
            {verb} {this.props.noun}
            {this.props.loading ? '...' : ''}
          </Button>
        </DialogActions>
      </form>
    );
  }
}

export default Form;
