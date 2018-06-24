import Form from './form';
import FormField from './form-field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  save as saveCandidate,
  remove as removeCandidate,
  reset as resetCandidate
} from '../actions/candidate';

class CandidateForm extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    success: PropTypes.bool.isRequired
  };

  componentWillUnmount() {
    this.props.dispatch(resetCandidate());
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.dispatch(
      saveCandidate({
        id: this.props.candidate.id,
        name: event.target.name.value,
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
        editing={Boolean(this.props.candidate.id)}
        loading={this.props.loading}
        onCancel={this.props.onCancel}
        onDelete={this.onDelete}
        onSubmit={this.onSubmit}
        onSuccess={this.props.onSuccess}
        success={this.props.success}
      >
        <FormField
          multiline
          label="Name"
          name="name"
          defaultValue={this.props.candidate.name}
        />
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.candidate.loading,
  success: state.candidate.success
});

export default connect(mapStateToProps)(CandidateForm);
