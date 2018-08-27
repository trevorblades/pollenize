import PropTypes from 'prop-types';
import React, {Component} from 'react';

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
