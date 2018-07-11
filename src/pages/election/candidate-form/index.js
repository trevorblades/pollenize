import ISO6391 from 'iso-639-1';
import ColorPicker from './color-picker';
import AutoForm from '../../../components/auto-form';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import ImageButton from '../../../components/image-button';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import filter from 'lodash/filter';
import map from 'lodash/map';
import reject from 'lodash/reject';
import styled from 'react-emotion';
import withProps from 'recompose/withProps';
import {DatePicker} from 'material-ui-pickers';
import {connect} from 'react-redux';
import {getNextSlug} from '../../../util';
import {size} from 'polished';
import {
  save as saveCandidate,
  remove as removeCandidate,
  reset as resetCandidate
} from '../../../actions/candidate';

const gridItemProps = {xs: 6};
const GridItem = withProps({
  ...gridItemProps,
  item: true
})(Grid);

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
      avatar: null,
      birthDate: new Date(props.candidate.birth_date || Date.now()),
      color: props.candidate.color
    };
  }

  componentWillUnmount() {
    this.props.dispatch(resetCandidate());
  }

  onBirthDateChange = birthDate => this.setState({birthDate});

  onAvatarChange = avatar => this.setState({avatar});

  onColorChange = color => this.setState({color: color.hex});

  onSubmit = event => {
    event.preventDefault();

    const parties = this.props.election.languages.map(language => ({
      text: event.target[`parties.${language.code}.text`].value,
      language_id: language.id
    }));

    const bios = this.props.election.languages.map(language => ({
      text: event.target[`bios.${language.code}.text`].value,
      language_id: language.id
    }));

    const {id} = this.props.candidate;
    const slug = getNextSlug(
      event.target.name.value,
      map(reject(this.props.election.candidates, ['id', id]), 'slug')
    );

    const formData = new FormData(event.target);
    formData.append('parties', JSON.stringify(filter(parties, 'text')));
    formData.append('bios', JSON.stringify(filter(bios, 'text')));
    formData.append('slug', slug);
    formData.append('birth_date', this.state.birthDate.toISOString());
    formData.append('color', this.state.color);
    formData.append('election_id', this.props.candidate.election_id);
    if (this.state.avatar) {
      formData.append('file', this.state.avatar.file);
    }

    this.props.dispatch(saveCandidate({id, formData}));
  };

  onDelete = () =>
    this.props.dispatch(removeCandidate(this.props.candidate.id));

  render() {
    const {errors} = this.props.error || {};
    return (
      <AutoForm
        noun="candidate"
        initialData={this.props.candidate}
        fields={[
          ['name', gridItemProps],
          ['party', gridItemProps],
          <GridItem key="date">
            <DatePicker
              fullWidth
              disableFuture
              margin="dense"
              label="Date of birth"
              onChange={this.onBirthDateChange}
              value={this.state.birthDate}
            />
          </GridItem>,
          ['hometown', gridItemProps],
          ...this.props.election.languages.map(({code}, index) => {
            const error =
              errors && (errors.parties || errors[`parties[${index}].text`]);
            return [
              `parties.${code}.text`,
              {
                error: Boolean(error),
                helperText: error && error.msg,
                label: `Party (${ISO6391.getNativeName(code)})`,
                multiline: true
              }
            ];
          }),
          ...this.props.election.languages.map(({code}, index) => {
            const error =
              errors && (errors.bios || errors[`bios[${index}].text`]);
            return [
              `bios.${code}.text`,
              {
                error: Boolean(error),
                helperText: error && error.msg,
                label: `Bio (${ISO6391.getNativeName(code)})`,
                multiline: true
              }
            ];
          }),
          // <Typography key="tip" variant="caption" gutterBottom>
          //   Tip: You may format the bios using markdown syntax. For example:{' '}
          //   <em>_italics_</em> <strong>*bold*</strong>
          // </Typography>,
          [
            'video_url',
            {
              label: 'YouTube URL',
              placeholder: 'https://www.youtube.com/watch?v=lz4nHQJo6Lc'
            }
          ],
          'video_caption',
          <GridItem key="avatar">
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
          </GridItem>,
          <GridItem key="color">
            <ColorPicker
              color={this.state.color}
              onChange={this.onColorChange}
            />
          </GridItem>
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
