import Avatar from '@material-ui/core/Avatar';
import Bio from './bio';
import Button from '@material-ui/core/Button';
import CandidateForm from '../candidate-form';
import CloseIcon from '@material-ui/icons/Close';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import DelayedTooltip from './delayed-tooltip';
import DialogTrigger from '../../../components/dialog-trigger';
import EditIcon from '@material-ui/icons/Edit';
import Footer from '../../../components/footer';
import Footnotes from './footnotes';
import Helmet from 'react-helmet';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Section, {getSectionPadding} from '../../../components/section';
import Sidebar from './sidebar';
import Topic from './topic';
import Typography from '@material-ui/core/Typography';
import find from 'lodash/find';
import reject from 'lodash/reject';
import styled, {css} from 'react-emotion';
import theme from '../../../theme';
import withProps from 'recompose/withProps';
import {centered} from '../../../styles';
import {connect} from 'react-redux';
import {
  getCandidates,
  getLocalize,
  getMatchMessage,
  getTopics
} from '../../../selectors';
import {getTitles} from '../../../util/election';
import {setCompareMode} from '../../../actions/settings';
import {size} from 'polished';

const compareButtonHeight = theme.spacing.unit * 7;
const compareButtonSpacing = theme.spacing.unit * 3;
const CompareButtonContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: 0,
  paddingRight: compareButtonSpacing,
  position: 'sticky',
  top:
    theme.mixins.toolbar.height +
    compareButtonSpacing +
    compareButtonHeight / 2,
  zIndex: theme.zIndex.mobileStepper
});

const CompareButton = styled(Button)({
  backgroundColor: theme.palette.background.default
});

const Hero = styled(Section)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundBlendMode: 'multiply',
  position: 'relative'
});

const StyledAvatar = styled(Avatar)(size(120), {
  marginBottom: theme.spacing.unit * 2.5
});

const Title = withProps({
  color: 'inherit',
  align: 'center'
})(Typography);

const Headline = styled(Title)({marginBottom: theme.spacing.unit});
const Subtitle = styled(Title)({
  fontWeight: theme.typography.fontWeightMedium
});

const StyledCompareArrowsIcon = styled(CompareArrowsIcon)({
  marginRight: theme.spacing.unit
});

const EditButton = styled(IconButton)({
  position: 'absolute',
  bottom: theme.spacing.unit,
  right: theme.spacing.unit
});

const Container = styled.div(centered, {
  display: 'flex',
  alignItems: 'flex-start',
  flexGrow: 1
});

const InnerContainer = styled.div({
  width: '100%',
  backgroundColor: theme.palette.background.paper
});

class Candidate extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    compareMode: PropTypes.bool.isRequired,
    comparates: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
    localize: PropTypes.func.isRequired,
    matchMessage: PropTypes.func.isRequired,
    renderHeader: PropTypes.func.isRequired,
    topics: PropTypes.array.isRequired
  };

  state = {
    activeTopicIndex: -1
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    let activeTopicIndex = -1;
    const {scrollY, innerWidth} = window;
    const topics = this.innerContainer.querySelectorAll('[data-topic]');
    for (let i = topics.length - 1; i >= 0; i--) {
      const topic = topics[i];
      const {top} = topic.getBoundingClientRect();
      const topicOffset =
        getSectionPadding(innerWidth, true) + theme.mixins.toolbar.height;
      const offset = Math.round(top) + scrollY - topicOffset;
      if (scrollY >= offset) {
        activeTopicIndex = i;
        break;
      }
    }

    this.setState({activeTopicIndex});
  };

  onCompareClick = () =>
    this.props.dispatch(setCompareMode(!this.props.compareMode));

  render() {
    const {message: party} = this.props.matchMessage(
      this.props.candidate.parties
    );
    const [title, subtitle] = getTitles(
      this.props.candidate.name,
      party,
      this.props.election.party_first
    );

    const canCompare = this.props.comparates.length > 0;
    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {this.props.renderHeader(title)}
        <Hero
          small
          style={{
            color: theme.palette.getContrastText(this.props.candidate.color),
            backgroundColor: this.props.candidate.color
          }}
        >
          {this.props.candidate.avatar && (
            <StyledAvatar
              alt={this.props.candidate.name}
              src={this.props.candidate.avatar}
            />
          )}
          <Headline variant="display2">{title}</Headline>
          {subtitle && (
            <Subtitle gutterBottom variant="headline">
              {subtitle}
            </Subtitle>
          )}
          {this.props.editMode && (
            <DialogTrigger
              renderContent={closeDialog => (
                <CandidateForm
                  candidate={this.props.candidate}
                  onCancel={closeDialog}
                  onSuccess={closeDialog}
                />
              )}
            >
              <EditButton color="inherit">
                <EditIcon />
              </EditButton>
            </DialogTrigger>
          )}
        </Hero>
        <Container>
          <Sidebar
            activeTopicIndex={this.state.activeTopicIndex}
            candidate={this.props.candidate}
            election={this.props.election}
          />
          <InnerContainer innerRef={node => (this.innerContainer = node)}>
            <Bio candidate={this.props.candidate} />
            {canCompare && (
              <CompareButtonContainer>
                <DelayedTooltip
                  placement="left"
                  title={this.props.localize(
                    this.props.compareMode
                      ? 'Exit compare mode'
                      : 'Enter compare mode'
                  )}
                >
                  <CompareButton
                    variant={this.props.compareMode ? 'fab' : 'extendedFab'}
                    onClick={this.onCompareClick}
                  >
                    {this.props.compareMode ? (
                      <CloseIcon />
                    ) : (
                      <Fragment>
                        <StyledCompareArrowsIcon />
                        Compare
                      </Fragment>
                    )}
                  </CompareButton>
                </DelayedTooltip>
              </CompareButtonContainer>
            )}
            {this.props.topics.map(topic => (
              <Topic
                topic={topic}
                key={topic.id}
                candidate={this.props.candidate}
                comparates={this.props.comparates}
              />
            ))}
          </InnerContainer>
        </Container>
        <Footnotes sources={this.props.candidate.sources} />
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const candidates = getCandidates(state);
  const predicate = ['slug', ownProps.match.params.id];
  return {
    candidate: find(candidates, predicate),
    compareMode: state.settings.compareMode.active,
    comparates: reject(candidates, predicate),
    editMode: state.settings.editMode,
    election: state.election.data,
    localize: getLocalize(state),
    matchMessage: getMatchMessage(state),
    topics: getTopics(state)
  };
};

export default connect(mapStateToProps)(Candidate);
