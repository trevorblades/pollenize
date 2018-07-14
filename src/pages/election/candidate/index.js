import Avatar from '@material-ui/core/Avatar';
import Bio from './bio';
import CandidateForm from '../candidate-form';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import ElectionHeader from '../election-header';
import DialogTrigger from '../../../components/dialog-trigger';
import Footer from '../../../components/footer';
import Footnotes from './footnotes';
import Helmet from 'react-helmet';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Sidebar from './sidebar';
import Topic from './topic';
import Typography from '@material-ui/core/Typography';
import find from 'lodash/find';
import styled from 'react-emotion';
import withProps from 'recompose/withProps';
import theme from '../../../theme';
import {Link} from 'react-router-dom';
import {centered} from '../../../styles';
import {connect} from 'react-redux';
import {getCandidates, getElection, getMatchMessage} from '../../../selectors';
import {getSectionPadding} from '../../../components/section';
import {size} from 'polished';

const Hero = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing.unit * 5,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundBlendMode: 'multiply',
  position: 'relative'
});

const StyledAvatar = styled(Avatar)(size(96), {
  marginBottom: theme.spacing.unit * 2
});

const Name = withProps({
  variant: 'display2',
  color: 'inherit'
})(
  styled(Typography)({
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

const StyledLink = styled(Link)({
  textDecoration: 'none'
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
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
    matchMessage: PropTypes.func.isRequired
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
    return (
      <Fragment>
        <Helmet>
          <title>{this.props.candidate.name}</title>
        </Helmet>
        <ElectionHeader>
          <StyledLink to={`/elections/${this.props.election.slug}`}>
            {this.props.election.title}
          </StyledLink>
          <ChevronRightIcon />
          {this.props.candidate.name}
        </ElectionHeader>
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
          <Name>{this.props.candidate.name}</Name>
          {party && (
            <Typography gutterBottom variant="title" color="inherit">
              {party.text}
            </Typography>
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
            <Divider />
            {this.props.election.topics.map(topic => {
              const positions = this.props.candidate.positions[topic.id];
              return (
                <Topic
                  topic={topic}
                  key={topic.id}
                  candidate={this.props.candidate}
                  positions={positions}
                />
              );
            })}
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
  return {
    candidate: find(candidates, ['slug', ownProps.match.params.id]),
    editMode: state.settings.editMode,
    election: getElection(state),
    matchMessage: getMatchMessage(state)
  };
};

export default connect(mapStateToProps)(Candidate);
