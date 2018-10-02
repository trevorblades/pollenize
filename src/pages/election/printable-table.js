import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../theme';
import {EMPTY_MESSAGE} from '../../constants';
import {connect} from 'react-redux';
import {
  getCandidates,
  getLocalize,
  getMatchMessage,
  getTopics
} from '../../selectors';

const StyledTableRow = styled(TableRow)({
  verticalAlign: 'text-top'
});

const StyledTableCell = styled(TableCell)({
  paddingRight: theme.spacing.unit * 3,
  wordBreak: 'break-word',
  hyphens: 'auto'
});

class PrintableTable extends Component {
  static propTypes = {
    candidates: PropTypes.array.isRequired,
    localize: PropTypes.func.isRequired,
    matchMessage: PropTypes.func.isRequired,
    topics: PropTypes.array.isRequired
  };

  renderPositions(positions) {
    if (!positions) {
      return this.props.localize(EMPTY_MESSAGE);
    }

    return positions.map((position, index, array) => {
      const {message} = this.props.matchMessage(position.messages);
      return (
        <Typography key={position.id} paragraph={index < array.length - 1}>
          {message.text}
        </Typography>
      );
    });
  }

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {this.props.candidates.map(candidate => (
              <TableCell key={candidate.id}>{candidate.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.topics.map(topic => {
            const {message: title} = this.props.matchMessage(topic.titles);
            return (
              <StyledTableRow key={topic.id}>
                <TableCell>
                  <Typography color="textSecondary">{title.text}</Typography>
                </TableCell>
                {this.props.candidates.map(candidate => {
                  const positions = candidate.positions[topic.id];
                  return (
                    <StyledTableCell key={candidate.id}>
                      {this.renderPositions(positions)}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  candidates: getCandidates(state),
  localize: getLocalize(state),
  matchMessage: getMatchMessage(state),
  topics: getTopics(state)
});

export default connect(mapStateToProps)(PrintableTable);
