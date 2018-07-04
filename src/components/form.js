import PropTypes from 'prop-types';
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import withProps from 'recompose/withProps';

export const FormField = withProps({
  fullWidth: true,
  margin: 'dense'
})(TextField);

class Form extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(event);
  };

  render() {
    return <form onSubmit={this.onSubmit}>{this.props.children}</form>;
  }
}

export default Form;
