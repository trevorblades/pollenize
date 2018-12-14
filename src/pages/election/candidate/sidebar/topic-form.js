import AutoForm from '../../../../components/auto-form';
import ButtonBase from '@material-ui/core/ButtonBase';
import FormControl from '@material-ui/core/FormControl';
import ImageButton from '../../../../components/image-button';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import reject from 'lodash/reject';
import round from 'lodash/round';
import styled from 'react-emotion';
import {TOPIC_IMAGE_ASPECT_RATIO, TOPIC_MAX_WIDTH} from '../common';
import {connect} from 'react-redux';
import {createMessageFields, getNextSlug, messagesFromEvent} from '../../util';
import {
  remove as removeTopic,
  reset as resetTopic,
  save as saveTopic
} from '../../../../actions/topic';

const ImageLabel = styled(Typography)({
  display: 'flex',
  justifyContent: 'space-between'
});

const StyledImageButton = styled(ImageButton)({
  paddingTop: `${round((1 / TOPIC_IMAGE_ASPECT_RATIO) * 100, 3)}%`
});

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

  state = {
    image: null
  };

  componentWillUnmount() {
    this.props.dispatch(resetTopic());
  }

  onImageChange = image => this.setState({image});

  onSubmit = event => {
    event.preventDefault();

    const [titles, descriptions] = messagesFromEvent(
      event,
      this.props.election.languages,
      ['titles', 'descriptions']
    );

    const formData = new FormData();
    formData.append('titles', JSON.stringify(titles));
    formData.append('descriptions', JSON.stringify(descriptions));

    const {id} = this.props.topic;
    const topics = reject(this.props.election.topics, ['id', id]);
    const slugs = map(topics, 'slug');
    const firstTitle = map(titles, 'text')[0];
    formData.append('slug', getNextSlug(firstTitle || '', slugs));
    formData.append('election_id', this.props.topic.election_id);

    const url = event.target.source.value;
    formData.append('sources', JSON.stringify(url ? [{url}] : []));

    if (this.state.image) {
      formData.append('file', this.state.image.file);
    }

    this.props.dispatch(saveTopic({id, formData}));
  };

  onDelete = () => this.props.dispatch(removeTopic(this.props.topic.id));

  removeImage = () =>
    this.setState({
      image: {
        file: null,
        dataUrl: null
      }
    });

  render() {
    const image = this.state.image
      ? this.state.image.dataUrl
      : this.props.topic.image;
    const {errors} = this.props.error || {};
    const [titles, descriptions] = createMessageFields(
      this.props.election.languages,
      errors,
      ['Title', 'titles'],
      ['Description', 'descriptions', true]
    );

    const source = this.props.topic.sources[0];
    return (
      <AutoForm
        noun="topic"
        initialData={this.props.topic}
        fields={[
          ...titles,
          ...descriptions,
          ['source', {defaultValue: source && source.url}],
          <FormControl fullWidth key="image" margin="dense">
            <ImageLabel gutterBottom variant="caption">
              Banner image ({TOPIC_MAX_WIDTH * 2} x{' '}
              {(TOPIC_MAX_WIDTH / TOPIC_IMAGE_ASPECT_RATIO) * 2} px)
              {image && (
                <ButtonBase onClick={this.removeImage}>Remove image</ButtonBase>
              )}
            </ImageLabel>
            <StyledImageButton
              iconSize={48}
              image={image}
              onChange={this.onImageChange}
            />
          </FormControl>
        ]}
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
