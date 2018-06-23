import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FullWidthTextField from '../../../../components/full-width-text-field';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import slugify from 'slugify';
import theme from '../../../../theme';
import {connect} from 'react-redux';
import {save as saveTopic} from '../../../../actions/topic';

class TopicForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
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
        title: this.state.title,
        slug: this.state.slug,
        description: event.target.description.value,
        election_id: this.props.topic.election_id
      })
    );
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <DialogTitle>Add a topic</DialogTitle>
        <DialogContent>
          <Grid container spacing={theme.spacing.unit * 2}>
            <Grid item xs>
              <FullWidthTextField
                label="Title"
                onChange={this.onTitleChange}
                value={this.state.title}
              />
            </Grid>
            <Grid item xs>
              <FullWidthTextField
                disabled
                label="URL slug"
                value={this.state.slug}
              />
            </Grid>
          </Grid>

          <FullWidthTextField
            multiline
            label="Description"
            name="description"
            defaultValue={this.props.topic.description}
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
