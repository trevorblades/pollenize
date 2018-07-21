import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import CandidateForm from './candidate-form';
import DialogTrigger from '../../components/dialog-trigger';
import Grid from '@material-ui/core/Grid';
import ElectionHeader from './election-header';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';
import minBy from 'lodash/minBy';
import styled, {css} from 'react-emotion';
import theme from '../../theme';
import defaultProps from 'recompose/defaultProps';
import withProps from 'recompose/withProps';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {divisors} from 'number-theory';
import {getLocalize, getCandidates, getMatchMessage} from '../../selectors';
import {size} from 'polished';

const containerClassName = css({flexGrow: 1});
const LinkButton = withProps({component: Link})(ButtonBase);
const GridItem = defaultProps({
  item: true,
  component: LinkButton
})(
  styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 4
  })
);

const StyledAvatar = styled(Avatar)(size(80), {
  marginBottom: theme.spacing.unit
});

const Name = withProps({
  variant: 'display1',
  color: 'inherit',
  align: 'center'
})(
  styled(Typography)({
    marginBottom: theme.spacing.unit / 2
  })
);

const CreateButton = withProps({variant: 'fab'})(
  styled(Button)({
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3
  })
);

class Candidates extends Component {
  static propTypes = {
    candidates: PropTypes.array.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
    localize: PropTypes.func.isRequired,
    matchMessage: PropTypes.func.isRequired
  };

  state = {
    size: false
  };

  componentDidMount() {
    window.addEventListener('resize', this.calculateSize);
    this.calculateSize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.candidates.length !== prevProps.candidates.length) {
      this.calculateSize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateSize);
  }

  calculateSize = () => {
    const {offsetWidth, offsetHeight} = this.container;
    const cellCount = Math.round(this.props.candidates.length / 2) * 2;
    if (cellCount) {
      const deltas = divisors(cellCount).map(divisor => {
        const width = offsetWidth / divisor;
        const height = offsetHeight / (cellCount / divisor);
        return {
          divisor,
          delta: Math.abs(width - height)
        };
      });

      const {divisor} = minBy(deltas, 'delta');
      this.setState({size: 12 / divisor});
    }
  };

  render() {
    return (
      <Fragment>
        <ElectionHeader>{this.props.election.title}</ElectionHeader>
        <RootRef rootRef={node => (this.container = node)}>
          <Grid container className={containerClassName}>
            {this.props.candidates.map(candidate => {
              const {message: party} = this.props.matchMessage(
                candidate.parties
              );
              return (
                <GridItem
                  xs={this.state.size}
                  key={candidate.id}
                  to={`/elections/${this.props.election.slug}/${
                    candidate.slug
                  }`}
                  style={{
                    color: theme.palette.getContrastText(candidate.color),
                    backgroundColor: candidate.color
                  }}
                >
                  {candidate.avatar && (
                    <StyledAvatar alt={candidate.name} src={candidate.avatar} />
                  )}
                  <Name>{candidate.name}</Name>
                  {party && (
                    <Typography variant="subheading" color="inherit">
                      {party.text}
                    </Typography>
                  )}
                </GridItem>
              );
            })}
          </Grid>
        </RootRef>
        {this.props.editMode && (
          <DialogTrigger
            renderContent={closeDialog => (
              <CandidateForm
                candidate={{
                  name: '',
                  party: '',
                  color: theme.palette.grey[500],
                  election_id: this.props.election.id
                }}
                onCancel={closeDialog}
                onSuccess={closeDialog}
              />
            )}
            tooltip={this.props.localize('Create a candidate')}
            tooltipProps={{placement: 'left'}}
          >
            <CreateButton>
              <AddIcon />
            </CreateButton>
          </DialogTrigger>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  candidates: getCandidates(state),
  editMode: state.settings.editMode,
  election: state.election.data,
  localize: getLocalize(state),
  matchMessage: getMatchMessage(state)
});

export default connect(mapStateToProps)(Candidates);
