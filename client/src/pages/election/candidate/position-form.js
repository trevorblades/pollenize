import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {
  create as createPosition,
  update as updatePosition
} from '../../../actions/position';

const FullWidthTextField = withProps({
  fullWidth: true,
  margin: 'dense'
})(TextField);

class PositionForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    position: PropTypes.object
  };

  static getDerivedStateFromProps(props) {
    if (props.position) {
      return {
        text: props.position.text,
        sources: props.position.sources
      };
    }
    return null;
  }

  state = {
    text: '',
    sources: []
  };

  onSubmit = event => {
    event.preventDefault();
    const position = {
      text: this.state.text,
      sources: this.state.sources
    };

    this.props.dispatch(
      this.props.position
        ? updatePosition({
            ...position,
            id: this.props.position.id
          })
        : createPosition(position)
    );
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <DialogTitle>Edit position</DialogTitle>
        <DialogContent>
          <FullWidthTextField
            multiline
            label="Summary"
            value={this.state.text}
          />
          {this.state.sources.map(source => (
            <FullWidthTextField key={source.id} value={source.url} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button type="submit" color="primary">
            Save changes
          </Button>
        </DialogActions>
      </form>
    );
  }
}

export default connect()(PositionForm);
