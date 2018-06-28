import Avatar from '@material-ui/core/Avatar';
import CandidateForm from '../../../components/candidate-form';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EditIcon from '@material-ui/icons/Edit';
import ElectionHeader from '../election-header';
import FormDialogTrigger from '../../../components/form-dialog-trigger';
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
import {
  SECTION_MAX_WIDTH,
  SECTION_VERTICAL_PADDING,
  sectionClassName
} from './common';
import {Link} from 'react-router-dom';
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
  variant: 'display1',
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

const Container = styled.div({
  display: 'flex',
  flexGrow: 1,
  position: 'relative'
});

const OffsetAnchor = styled.a({
  display: 'block',
  position: 'relative',
  top: -theme.mixins.toolbar.height
});

const Content = styled.div({
  width: '100%',
  maxWidth: SECTION_MAX_WIDTH,
  borderLeft: `1px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.background.paper
});

const FootnotesSection = styled.section(sectionClassName, {
  backgroundColor: theme.palette.grey[100]
});

const Footnotes = styled.ol({
  margin: 0,
  padding: 0,
  paddingLeft: theme.spacing.unit * 2
});

const Footnote = withProps({component: 'li'})(
  styled(Typography)({
    display: 'list-item'
  })
);

const Spacer = styled.div({
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper
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
      const element = this.content.querySelector(`a[name="${hash.slice(1)}"]`);
      if (element) {
        const {top} = element.getBoundingClientRect();
        window.scrollTo(0, Math.floor(top) + window.scrollY);
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
    const anchors = this.content.querySelectorAll('a[name]');
    for (let i = anchors.length - 1; i >= 0; i--) {
      const anchor = anchors[i];
      const {top} = anchor.getBoundingClientRect();
      const offset = Math.floor(top) + scrollY - SECTION_VERTICAL_PADDING;
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
          <Content innerRef={node => (this.content = node)}>
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
            <FootnotesSection>
              <Typography gutterBottom variant="title">
                Sources
              </Typography>
              <Footnotes>
                {this.props.candidate.sources.map((source, index, array) => (
                  <Footnote
                    gutterBottom={index < array.length - 1}
                    key={source.id}
                  >
                    <a
                      href={source.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {source.url}
                    </a>
                  </Footnote>
                ))}
              </Footnotes>
            </FootnotesSection>
          </Content>
          <Spacer />
        </Container>
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
