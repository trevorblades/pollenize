import AutoForm from '../../../components/auto-form';
import ColorPicker from './color-picker';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import ImageButton from '../../../components/image-button';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import reject from 'lodash/reject';
import styled from 'react-emotion';
import withProps from 'recompose/withProps';
import {DatePicker} from 'material-ui-pickers';
import {connect} from 'react-redux';
import {createMessageFields, getNextSlug, messagesFromEvent} from '../util';
import {
  remove as removeCandidate,
  reset as resetCandidate,
  save as saveCandidate
} from '../../../actions/candidate';
import {size} from 'polished';

const GridItem = withProps({item: true})(Grid);
const SmallGridItem = withProps({xs: 4})(GridItem);

const AvatarButton = styled(ImageButton)(size(96), {
  borderRadius: '50%'
});

class CandidateForm extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    election: PropTypes.object.isRequired,
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    success: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      active: props.candidate.active,
      avatar: null,
      birthDate:
        props.candidate.birth_date && new Date(props.candidate.birth_date),
      color: props.candidate.color
    };
  }

  componentWillUnmount() {
    this.props.dispatch(resetCandidate());
  }

  onBirthDateChange = birthDate => this.setState({birthDate});

  onAvatarChange = avatar => this.setState({avatar});

  onColorChange = color => this.setState({color: color.hex});

  onActiveChange = event => this.setState({active: event.target.checked});

  onSubmit = event => {
    event.preventDefault();

    const [parties, bios, captions] = messagesFromEvent(
      event,
      this.props.election.languages,
      ['parties', 'bios', 'captions'],
      true
    );

    const {id} = this.props.candidate;
    const slug = getNextSlug(
      event.target.name.value,
      map(reject(this.props.election.candidates, ['id', id]), 'slug')
    );

    const formData = new FormData(event.target);
    formData.append('parties', parties);
    formData.append('bios', bios);
    formData.append('captions', captions);
    formData.append('slug', slug);
    formData.append('color', this.state.color);
    formData.append('active', this.state.active);
    formData.append('election_id', this.props.candidate.election_id);

    if (this.state.birthDate) {
      formData.append('birth_date', this.state.birthDate.toISOString());
    }

    if (this.state.avatar) {
      formData.append('file', this.state.avatar.file);
    }

    this.props.dispatch(saveCandidate({id, formData}));
  };

  onDelete = () =>
    this.props.dispatch(removeCandidate(this.props.candidate.id));

  render() {
    const {errors} = this.props.error || {};
    const [parties, bios, captions] = createMessageFields(
      this.props.election.languages,
      errors,
      ['Party', 'parties'],
      ['Bio', 'bios', true],
      ['Video caption', 'captions']
    );

    return (
      <AutoForm
        noun="candidate"
        initialData={this.props.candidate}
        fields={[
          'name',
          <GridItem key="date" xs={6}>
            <DatePicker
              fullWidth
              disableFuture
              openToYearSelection
              margin="dense"
              label="Date of birth"
              onChange={this.onBirthDateChange}
              value={this.state.birthDate}
            />
          </GridItem>,
          ['hometown', {xs: 6}],
          ...parties,
          ...bios,
          [
            'video_url',
            {
              label: 'YouTube URL',
              placeholder: 'https://www.youtube.com/watch?v=lz4nHQJo6Lc'
            }
          ],
          ...captions,
          <SmallGridItem key="avatar">
            <FormControl margin="dense">
              <Typography gutterBottom variant="caption">
                Avatar image
              </Typography>
              <AvatarButton
                image={
                  this.state.avatar
                    ? this.state.avatar.dataUrl
                    : this.props.candidate.avatar
                }
                onChange={this.onAvatarChange}
              />
            </FormControl>
          </SmallGridItem>,
          <SmallGridItem key="color">
            <ColorPicker
              color={this.state.color}
              onChange={this.onColorChange}
            />
          </SmallGridItem>,
          <SmallGridItem key="active">
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.active}
                  onChange={this.onActiveChange}
                />
              }
              label={this.state.active ? 'Active' : 'Inactive'}
            />
          </SmallGridItem>
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
  error: state.candidate.error,
  loading: state.candidate.loading,
  success: state.candidate.success
});

export default connect(mapStateToProps)(CandidateForm);
