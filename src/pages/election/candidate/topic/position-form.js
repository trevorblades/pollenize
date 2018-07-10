import ISO6391 from 'iso-639-1';
import AutoForm from '../../../../components/auto-form';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import filter from 'lodash/filter';
import map from 'lodash/map';
import {FormField} from '../../../../components/form';
import {connect} from 'react-redux';
import {
  save as savePosition,
  remove as removePosition,
  reset as resetPosition
} from '../../../../actions/position';

class PositionForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    election: PropTypes.object.isRequired,
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    position: PropTypes.object.isRequired,
    success: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      autoFocusIndex: -1,
      sources: map(props.position.sources, 'url')
    };
  }

  componentWillUnmount() {
    this.props.dispatch(resetPosition());
  }

  onSourceChange = (index, event) => {
    const {value} = event.target;
    this.setState(prevState => ({
      sources: [
        ...prevState.sources.slice(0, index),
        value,
        ...prevState.sources.slice(index + 1)
      ]
    }));
  };

  onAddSourceClick = () =>
    this.setState(prevState => {
      const sources = [...prevState.sources, ''];
      return {
        sources,
        autoFocusIndex: sources.length - 1
      };
    });

  onSubmit = event => {
    const messages = this.props.election.languages.map(language => ({
      text: event.target[`messages.${language.code}.text`].value,
      language_id: language.id
    }));
    this.props.dispatch(
      savePosition({
        id: this.props.position.id,
        messages: filter(messages, 'text'),
        sources: filter(this.state.sources).map(source => ({url: source})),
        candidate_id: this.props.position.candidate_id,
        topic_id: this.props.position.topic_id
      })
    );
  };

  onDelete = () => this.props.dispatch(removePosition(this.props.position.id));

  renderButtonText() {
    const verbs = [['Create', 'Creating'], ['Save', 'Saving']];
    const verb =
      verbs[Number(Boolean(this.props.position.id))][
        Number(this.props.loading)
      ];

    return `${verb} position${this.props.loading ? '...' : ''}`;
  }

  render() {
    const {errors} = this.props.error || {};
    const sources = this.state.sources.map((source, index) => {
      const key = `sources[${index}].url`;
      const error = errors && errors[key];
      return (
        <FormField
          error={Boolean(error)}
          helperText={error && error.msg}
          autoFocus={index === this.state.autoFocusIndex}
          key={key}
          value={source}
          placeholder="Enter the source website URL"
          onChange={event => this.onSourceChange(index, event)}
        />
      );
    });

    const fields = this.props.election.languages
      .map(({code}) => [
        `messages.${code}.text`,
        {
          label: `Summary (${ISO6391.getNativeName(code)})`,
          multiline: true
        }
      ])
      .concat(sources);

    if (!this.state.sources.includes('')) {
      fields.push(
        <FormField
          disabled
          key="source"
          placeholder="Add another source"
          onClick={this.onAddSourceClick}
        />
      );
    }

    return (
      <AutoForm
        noun="position"
        initialData={this.props.position}
        fields={fields}
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
  error: state.position.error,
  loading: state.position.loading,
  success: state.position.success
});

export default connect(mapStateToProps)(PositionForm);
