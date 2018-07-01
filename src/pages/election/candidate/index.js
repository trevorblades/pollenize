import Avatar from '@material-ui/core/Avatar';
import Bio from './bio';
import CandidateForm from '../../../components/candidate-form';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EditIcon from '@material-ui/icons/Edit';
import ElectionHeader from '../election-header';
import FormDialogTrigger from '../../../components/form-dialog-trigger';
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
import {SECTION_PADDING_SMALL} from '../../../components/section';
import {Link} from 'react-router-dom';
import {centered} from '../../../styles';
import {connect} from 'react-redux';
import {getCandidates} from '../../../selectors';
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

const OffsetAnchor = styled.a({
  display: 'block',
  position: 'relative',
  // We add a magic number 1 that helps avoid an extra pixel between
  // the header and a topic banner image
  top: -theme.mixins.toolbar.height + 1
});

class Candidate extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    activeTopicIndex: -1
  };

  componentDidMount() {
    const {hash} = window.location;
    if (hash) {
      const element = this.innerContainer.querySelector(
        `a[name="${hash.slice(1)}"]`
      );
      if (element) {
        const {top} = element.getBoundingClientRect();
        window.scrollTo(0, Math.round(top) + window.scrollY);
      }
    }

    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    let hash = '';
    let activeTopicIndex = -1;

    const {scrollY} = window;
    const anchors = this.innerContainer.querySelectorAll('a[name]');
    for (let i = anchors.length - 1; i >= 0; i--) {
      const anchor = anchors[i];
      const {top} = anchor.getBoundingClientRect();
      const offset = Math.round(top) + scrollY - SECTION_PADDING_SMALL;
      if (scrollY >= offset) {
        hash = anchor.name;
        activeTopicIndex = i;
        break;
      }
    }

    if (window.location.hash.slice(1) !== hash) {
      this.props.history.replace(`#${hash}`);
    }

    this.setState({activeTopicIndex});
  };

  render() {
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
            <StyledAvatar src={this.props.candidate.avatar} />
          )}
          <Name>{this.props.candidate.name}</Name>
          <Typography gutterBottom variant="title" color="inherit">
            {this.props.candidate.party}
          </Typography>
          {this.props.editMode && (
            <FormDialogTrigger
              form={<CandidateForm candidate={this.props.candidate} />}
            >
              <EditButton>
                <EditIcon />
              </EditButton>
            </FormDialogTrigger>
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
            {this.props.election.topics.map(topic => (
              <div key={topic.id}>
                <OffsetAnchor name={topic.slug} />
                <Topic
                  topic={topic}
                  candidate={this.props.candidate}
                  positions={this.props.candidate.positions[topic.id]}
                />
              </div>
            ))}
            <OffsetAnchor name="sources" />
          </InnerContainer>
        </Container>
        <Footnotes sources={this.props.candidate.sources} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const candidates = getCandidates(state);
  return {
    candidate: find(candidates, ['slug', ownProps.match.params.id]),
    editMode: state.settings.editMode,
    election: state.election.data
  };
};

export default connect(mapStateToProps)(Candidate);
