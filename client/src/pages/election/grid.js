import Button from '@material-ui/core/Button';
import ElectionHeader from './election-header';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import withProps from 'recompose/withProps';
import {Link} from 'react-router-dom';

const LinkButton = withProps({component: Link})(Button);

class Grid extends Component {
  static propTypes = {
    election: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <ElectionHeader>{this.props.election.title}</ElectionHeader>
        <div>
          {this.props.election.candidates.map(candidate => (
            <LinkButton
              key={candidate.id}
              to={`/elections/${this.props.election.id}/${candidate.id}`}
            >
              {candidate.name}
            </LinkButton>
          ))}
        </div>
      </div>
    );
  }
}

export default Grid;
