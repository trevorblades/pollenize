import ColorPicker from './color-picker';
import Form from '../form';
import FormField from '../form-field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import slugify from 'slugify';
import {connect} from 'react-redux';
import {
  save as saveCandidate,
  remove as removeCandidate,
  reset as resetCandidate
} from '../../actions/candidate';

class CandidateForm extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    success: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      color: props.candidate.color
    };
  }

  componentWillUnmount() {
    this.props.dispatch(resetCandidate());
  }

  onColorChange = color => this.setState({color: color.hex});

  onSubmit = event => {
    event.preventDefault();

    const name = event.target.name.value;
    this.props.dispatch(
      saveCandidate({
        id: this.props.candidate.id,
        name,
        slug: slugify(name, {lower: true}),
        party: event.target.party.value,
        color: this.state.color,
        election_id: this.props.candidate.election_id
      })
    );
  };

  onDelete = () =>
    this.props.dispatch(removeCandidate(this.props.candidate.id));

  render() {
    const {errors} = this.props.error || {};
    return (
      <Form
        noun="candidate"
        editing={Boolean(this.props.candidate.id)}
        loading={this.props.loading}
        onCancel={this.props.onCancel}
        onDelete={this.onDelete}
        onSubmit={this.onSubmit}
        onSuccess={this.props.onSuccess}
        success={this.props.success}
      >
        <FormField
          label="Name"
          name="name"
          defaultValue={this.props.candidate.name}
          error={errors && 'name' in errors}
          helperText={errors && errors.name && errors.name.msg}
        />
        <FormField
          label="Party"
          name="party"
          defaultValue={this.props.candidate.party}
          error={errors && 'party' in errors}
          helperText={errors && errors.party && errors.party.msg}
        />
        <ColorPicker color={this.state.color} onChange={this.onColorChange} />
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  error: state.candidate.error,
  loading: state.candidate.loading,
  success: state.candidate.success
});

export default connect(mapStateToProps)(CandidateForm);
