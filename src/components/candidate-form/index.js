import ButtonBase from '@material-ui/core/ButtonBase';
import ColorPicker from './color-picker';
import Form from '../form';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import ImageIcon from '@material-ui/icons/Image';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import reject from 'lodash/reject';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {getNextSlug} from '../../util';
import {size} from 'polished';
import {
  save as saveCandidate,
  remove as removeCandidate,
  reset as resetCandidate
} from '../../actions/candidate';

const GridItem = withProps({
  item: true,
  xs: true
})(Grid);

const AvatarButton = withProps({component: 'label'})(
  styled(ButtonBase)(size(96), {
    borderRadius: '50%',
    color: theme.palette.grey[500],
    backgroundColor: theme.palette.grey[100],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  })
);

const FileInput = withProps({type: 'file'})(styled.input({display: 'none'}));

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
      color: props.candidate.color,
      avatar: null
    };
  }

  componentWillUnmount() {
    this.props.dispatch(resetCandidate());
  }

  onFileChange = event => {
    const file = event.target.files[0];
    this.setState({avatar: {file}});

    const reader = new FileReader();
    reader.addEventListener('load', this.onReaderLoad);
    reader.readAsDataURL(file);

    event.target.value = null;
  };

  onReaderLoad = event =>
    this.setState(prevState => ({
      avatar: {
        ...prevState.avatar,
        dataUrl: event.target.result
      }
    }));

  onColorChange = color => this.setState({color: color.hex});

  onSubmit = event => {
    event.preventDefault();

    const {id} = this.props.candidate;
    const candidates = reject(this.props.election.candidates, ['id', id]);
    const slugs = map(candidates, 'slug');
    const formData = new FormData(event.target);
    formData.append('slug', getNextSlug(event.target.name.value, slugs));
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
    const avatar = this.state.avatar
      ? this.state.avatar.dataUrl
      : this.props.candidate.avatar;
    return (
      <Form
        noun="candidate"
        initialData={this.props.candidate}
        fields={[
          'name',
          'party',
          <Grid container spacing={theme.spacing.unit * 2} key="grid">
            <GridItem>
              <FormControl margin="dense">
                <Typography gutterBottom variant="caption">
                  Avatar image
                </Typography>
                <AvatarButton
                  style={{backgroundImage: avatar && `url(${avatar})`}}
                >
                  {!avatar && <ImageIcon />}
                  <FileInput onChange={this.onFileChange} />
                </AvatarButton>
              </FormControl>
            </GridItem>
            <GridItem>
              <ColorPicker
                color={this.state.color}
                onChange={this.onColorChange}
              />
            </GridItem>
          </Grid>
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
