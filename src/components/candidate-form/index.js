import ColorPicker from './color-picker';
import Form from '../form';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import map from 'lodash/map';
import {connect} from 'react-redux';
import {getNextSlug} from '../../util';
import {
  save as saveCandidate,
  remove as removeCandidate,
  reset as resetCandidate
} from '../../actions/candidate';

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
    const slugs = map(this.props.election.candidates, 'slug');
    this.props.dispatch(
      saveCandidate({
        id: this.props.candidate.id,
        name,
        slug: getNextSlug(name, slugs),
        party: event.target.party.value,
        color: this.state.color,
        election_id: this.props.candidate.election_id
      })
    );
  };

  onDelete = () =>
    this.props.dispatch(removeCandidate(this.props.candidate.id));

  render() {
    return (
      <Form
        noun="candidate"
        initialData={this.props.candidate}
        fields={[
          'name',
          'party',
          <ColorPicker
            key="color"
            color={this.state.color}
            onChange={this.onColorChange}
          />
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
