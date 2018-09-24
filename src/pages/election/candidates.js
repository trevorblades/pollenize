import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import CandidateForm from './candidate-form';
import DialogTrigger from '../../components/dialog-trigger';
import Grid from '@material-ui/core/Grid';
import Logo from '../../assets/logo.svg';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';
import minBy from 'lodash/minBy';
import styled, {css} from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {divisors} from 'number-theory';
import {footerClassName} from '../../components/footer';
import {getCandidates, getLocalize, getMatchMessage} from '../../selectors';
import {getTitles} from '../../util/election';
import {size} from 'polished';

const containerClassName = css({flexGrow: 1});
const LinkButton = withProps({component: Link})(ButtonBase);
const GridItem = withProps({item: true})(
  styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 4
  })
);

const EmptyGridItem = styled(GridItem)(footerClassName, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  svg: css(size(56), {fill: 'currentColor'})
});

const StyledAvatar = styled(Avatar)(size(96), {
  marginBottom: theme.spacing.unit * 2
});

const Title = withProps({
  color: 'inherit',
  align: 'center'
})(Typography);

const Headline = styled(Title)({
  marginBottom: theme.spacing.unit * 0.75
});

const CreateButton = styled(Button)({
  position: 'absolute',
  bottom: theme.spacing.unit * 3,
  right: theme.spacing.unit * 3
});

class Candidates extends Component {
  static propTypes = {
    basePath: PropTypes.string.isRequired,
    candidates: PropTypes.array.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
    localize: PropTypes.func.isRequired,
    matchMessage: PropTypes.func.isRequired,
    renderHeader: PropTypes.func.isRequired
  };

  state = {
    cellSize: null
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
      this.setState({cellSize: 1 / divisor});
    }
  };

  renderCandidate = candidate => {
    const {message: party} = this.props.matchMessage(candidate.parties);
    const [title, subtitle] = getTitles(
      candidate.name,
      party,
      this.props.election.party_first
    );

    return (
      <GridItem
        key={candidate.id}
        component={LinkButton}
        to={`${this.props.basePath}/${candidate.slug}`}
        style={{
          width: this.state.cellSize && `${100 * this.state.cellSize}%`,
          color: theme.palette.getContrastText(candidate.color),
          backgroundColor: candidate.color
        }}
      >
        {candidate.avatar && (
          <StyledAvatar alt={candidate.name} src={candidate.avatar} />
        )}
        <Headline variant="display1">{title}</Headline>
        {subtitle && <Title variant="title">{subtitle}</Title>}
      </GridItem>
    );
  };

  render() {
    return (
      <Fragment>
        {this.props.renderHeader()}
        <RootRef rootRef={node => (this.container = node)}>
          <Grid container className={containerClassName}>
            {this.props.candidates.map(this.renderCandidate)}
            {this.props.candidates.length % 2 > 0 && (
              <EmptyGridItem>
                <Logo />
              </EmptyGridItem>
            )}
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
                  election_id: this.props.election.id,
                  active: true
                }}
                onCancel={closeDialog}
                onSuccess={closeDialog}
              />
            )}
            tooltip={this.props.localize('Create a candidate')}
            tooltipProps={{placement: 'left'}}
          >
            <CreateButton variant="fab">
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
