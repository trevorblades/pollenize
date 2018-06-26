import Form from '../../../../components/form';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import slugify from 'slugify';
import {connect} from 'react-redux';
import {
  save as saveTopic,
  remove as removeTopic,
  reset as resetTopic
} from '../../../../actions/topic';

class TopicForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
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
    this.props.dispatch(
      saveTopic({
        id: this.props.topic.id,
        title,
        slug: slugify(title, {lower: true}),
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
  error: state.topic.error,
  loading: state.topic.loading,
  success: state.topic.success
});

export default connect(mapStateToProps)(TopicForm);
