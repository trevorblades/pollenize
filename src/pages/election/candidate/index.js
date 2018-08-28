import Avatar from '@material-ui/core/Avatar';
import Bio from './bio';
import CandidateForm from '../candidate-form';
import EditIcon from '@material-ui/icons/Edit';
import DialogTrigger from '../../../components/dialog-trigger';
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
import styled from 'react-emotion';
import withProps from 'recompose/withProps';
import theme from '../../../theme';
import {centered} from '../../../styles';
import {connect} from 'react-redux';
import {getCandidates, getTopics, getMatchMessage} from '../../../selectors';
import {getTitles} from '../../../util/election';
import {size} from 'polished';

const Hero = withProps({small: true})(
  styled(Section)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'multiply',
    position: 'relative'
  })
);

const StyledAvatar = styled(Avatar)(size(120), {
  marginBottom: theme.spacing.unit * 2.5
});

const Title = withProps({
  color: 'inherit',
  align: 'center'
})(Typography);

const Headline = withProps({variant: 'display2'})(
  styled(Title)({
    marginBottom: theme.spacing.unit
  })
);

const EditButton = withProps({color: 'inherit'})(
  styled(IconButton)({
    position: 'absolute',
    bottom: theme.spacing.unit,
    right: theme.spacing.unit
  })
);

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
    comparates: PropTypes.array.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
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

  render() {
    const {message: party} = this.props.matchMessage(
      this.props.candidate.parties
    );
    const [title, subtitle] = getTitles(
      this.props.candidate.name,
      party,
      this.props.election.party_first
    );

    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {this.props.renderHeader(title)}
        <Hero
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
          <Headline>{title}</Headline>
          {subtitle && (
            <Title gutterBottom variant="headline">
              {subtitle}
            </Title>
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
              <EditButton>
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
    comparates: reject(candidates, predicate),
    editMode: state.settings.editMode,
    election: state.election.data,
    matchMessage: getMatchMessage(state),
    topics: getTopics(state)
  };
};

export default connect(mapStateToProps)(Candidate);
