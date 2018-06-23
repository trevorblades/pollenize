import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FullWidthTextField from '../../../../components/full-width-text-field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import map from 'lodash/map';
import styled from 'react-emotion';
import theme from '../../../../theme';
import {connect} from 'react-redux';
import {
  save as savePosition,
  remove as removePosition,
  reset as resetPosition
} from '../../../../actions/position';

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
      autoFocusIndex: -1,
      text: props.position.text,
      sources: map(props.position.sources, 'url')
    };
  }

  componentWillUnmount() {
    this.props.dispatch(resetPosition());
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

  onAddSourceClick = () =>
    this.setState(prevState => {
      const sources = [...prevState.sources, ''];
      return {
        sources,
        autoFocusIndex: sources.length - 1
      };
    });

  onSubmit = event => {
    event.preventDefault();
    this.props.dispatch(
      savePosition({
        ...this.props.position,
        text: this.state.text,
        sources: this.state.sources
          .filter(source => source.trim())
          .map(url => ({url}))
      })
    );
  };

  onDeleteClick = () =>
    this.props.dispatch(removePosition(this.props.position.id));

  renderButtonText() {
    const verbs = [['Create', 'Creating'], ['Save', 'Saving']];
    const verb =
      verbs[Number(Boolean(this.props.position.id))][
        Number(this.props.loading)
      ];

    return `${verb} position${this.props.loading ? '...' : ''}`;
  }

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
              autoFocus={index === this.state.autoFocusIndex}
              key={index.toString()}
              value={source}
              placeholder="Enter the source website URL"
              onChange={event => this.onSourceChange(index, event)}
            />
          ))}
          {!this.state.sources.includes('') && (
            <FullWidthTextField
              disabled
              placeholder="Add another source"
              onClick={this.onAddSourceClick}
            />
          )}
        </DialogContent>
        <DialogActions>
          {this.props.position.id && (
            <DeleteButton
              disabled={this.props.loading}
              onClick={this.onDeleteClick}
            >
              Delete
            </DeleteButton>
          )}
          <Button disabled={this.props.loading} onClick={this.props.onClose}>
            Cancel
          </Button>
          <Button disabled={this.props.loading} type="submit">
            {this.renderButtonText()}
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
