import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import slugify from 'slugify';
import theme from '../../../../theme';
import {DeleteButton, FormField} from '../../../../components/form';
import {connect} from 'react-redux';
import {getSubmitButtonText} from '../../../../util/form';
import {
  save as saveTopic,
  remove as removeTopic
} from '../../../../actions/topic';

class TopicForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    topic: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.topic.title,
      slug: props.topic.slug
    };
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

  onDeleteClick = () => this.props.dispatch(removeTopic(this.props.topic.id));

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <DialogTitle>Add a topic</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          {this.props.topic.id && (
            <DeleteButton
              disabled={this.props.loading}
              onClick={this.onDeleteClick}
            />
          )}
          <Button disabled={this.props.loading} onClick={this.props.onClose}>
            Cancel
          </Button>
          <Button disabled={this.props.loading} type="submit">
            {getSubmitButtonText(
              'topic',
              this.props.topic.id,
              this.props.loading
            )}
          </Button>
        </DialogActions>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.topic.loading
});

export default connect(mapStateToProps)(TopicForm);
