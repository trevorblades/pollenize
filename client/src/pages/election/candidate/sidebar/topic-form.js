import Form from '../../../../components/form';
import FormField from '../../../../components/form-field';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import slugify from 'slugify';
import theme from '../../../../theme';
import {connect} from 'react-redux';
import {
  save as saveTopic,
  remove as removeTopic,
  reset as resetTopic
} from '../../../../actions/topic';

class TopicForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    success: PropTypes.bool.isRequired,
    topic: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.topic.title,
      slug: props.topic.slug
    };
  }

  componentWillUnmount() {
    this.props.dispatch(resetTopic());
  }

  onTitleChange = event => {
    const {value} = event.target;
    this.setState({
      title: value,
      slug: slugify(value, {lower: true})
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.dispatch(
      saveTopic({
        id: this.props.topic.id,
        title: this.state.title,
        slug: this.state.slug,
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
        editing={Boolean(this.props.topic.id)}
        loading={this.props.loading}
        onCancel={this.props.onCancel}
        onDelete={this.onDelete}
        onSubmit={this.onSubmit}
        onSuccess={this.props.onSuccess}
        success={this.props.success}
      >
        <Grid container spacing={theme.spacing.unit * 2}>
          <Grid item xs>
            <FormField
              label="Title"
              onChange={this.onTitleChange}
              value={this.state.title}
            />
          </Grid>
          <Grid item xs>
            <FormField disabled label="URL slug" value={this.state.slug} />
          </Grid>
        </Grid>
        <FormField
          multiline
          label="Description"
          name="description"
          defaultValue={this.props.topic.description}
        />
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.topic.loading,
  success: state.topic.success
});

export default connect(mapStateToProps)(TopicForm);
