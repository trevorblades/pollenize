import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import map from 'lodash/map';
import styled from 'react-emotion';
import theme from '../../../theme';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {save as savePosition} from '../../../actions/position';

const FullWidthTextField = withProps({
  fullWidth: true,
  margin: 'dense'
})(TextField);

const DeleteButton = styled(Button)({
  marginRight: 'auto',
  color: theme.palette.error.main
});

class PositionForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    position: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.position.text,
      sources: map(props.position.sources, 'url')
    };
  }

  onTextChange = event => this.setState({text: event.target.value});

  onSourceChange = (index, event) => {
    const {value} = event.target;
    this.setState(prevState => ({
      sources: [
        ...prevState.sources.slice(0, index),
        value,
        ...prevState.sources.slice(index + 1)
      ]
    }));
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.dispatch(
      savePosition({
        ...this.props.position,
        text: this.state.text,
        sources: this.state.sources.map(url => ({url}))
      })
    );
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <DialogTitle>
          {this.props.position.id ? 'Edit' : 'Add a'} position
        </DialogTitle>
        <DialogContent>
          <FullWidthTextField
            multiline
            label="Summary"
            value={this.state.text}
            onChange={this.onTextChange}
          />
          {this.state.sources.map((source, index) => (
            <FullWidthTextField
              key={index.toString()}
              value={source}
              placeholder="Enter the source website URL"
              onChange={event => this.onSourceChange(index, event)}
            />
          ))}
        </DialogContent>
        <DialogActions>
          {this.props.position.id && (
            <DeleteButton disabled={this.props.loading}>Delete</DeleteButton>
          )}
          <Button disabled={this.props.loading} onClick={this.props.onClose}>
            Cancel
          </Button>
          <Button disabled={this.props.loading} type="submit" color="primary">
            {this.props.loading ? 'Saving changes...' : 'Save changes'}
          </Button>
        </DialogActions>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.position.loading
});

export default connect(mapStateToProps)(PositionForm);
