import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FullWidthTextField from '../../../components/full-width-text-field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {save as saveTopic} from '../../../actions/topic';

class TopicForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.dispatch(
      saveTopic({
        title: event.target.title.value,
        description: event.target.description.value
      })
    );
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <DialogTitle>Add a topic</DialogTitle>
        <DialogContent>
          <FullWidthTextField label="Title" name="title" />
          <FullWidthTextField
            multiline
            label="Description"
            name="description"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button type="submit">Create topic</Button>
        </DialogActions>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.topic.loading
});

export default connect(mapStateToProps)(TopicForm);
