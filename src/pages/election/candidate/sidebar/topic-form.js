import Form from '../../../../components/form';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import map from 'lodash/map';
import {connect} from 'react-redux';
import {getNextSlug} from '../../../../util';
import {
  save as saveTopic,
  remove as removeTopic,
  reset as resetTopic
} from '../../../../actions/topic';

class TopicForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    election: PropTypes.object.isRequired,
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    success: PropTypes.bool.isRequired,
    topic: PropTypes.object.isRequired
  };

  componentWillUnmount() {
    this.props.dispatch(resetTopic());
  }

  onSubmit = event => {
    event.preventDefault();

    const title = event.target.title.value;
    const slugs = map(this.props.election.topics, 'slug');
    this.props.dispatch(
      saveTopic({
        id: this.props.topic.id,
        title,
        slug: getNextSlug(title, slugs),
        description: event.target.description.value,
        election_id: this.props.topic.election_id
      })
    );
  };

  onDelete = () => this.props.dispatch(removeTopic(this.props.topic.id));

  render() {
    return (
      <Form
        noun="topic"
        initialData={this.props.topic}
        fields={['title', ['description', {multiline: true}]]}
        loading={this.props.loading}
        error={this.props.error}
        success={this.props.success}
        onCancel={this.props.onCancel}
        onDelete={this.onDelete}
        onSubmit={this.onSubmit}
        onSuccess={this.props.onSuccess}
      />
    );
  }
}

const mapStateToProps = state => ({
  election: state.election.data,
  error: state.topic.error,
  loading: state.topic.loading,
  success: state.topic.success
});

export default connect(mapStateToProps)(TopicForm);
