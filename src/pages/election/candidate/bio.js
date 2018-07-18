import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import Section from '../../../components/section';
import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/defaultProps';
import differenceInYears from 'date-fns/differenceInYears';
import getYouTubeId from 'get-youtube-id';
import styled from 'react-emotion';
import theme from '../../../theme';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {getLocalize, getMatchMessage} from '../../../selectors';

const breakpoint = theme.breakpoints.up('md');
const Content = styled.div({
  [breakpoint]: {
    display: 'flex',
    alignItems: 'flex-start'
  }
});

const InnerContent = styled.div({flexGrow: 1});

const videoMargin = theme.spacing.unit * 3;
const VideoContainer = styled.div({
  width: '100%',
  marginTop: videoMargin,
  [breakpoint]: {
    flexShrink: 0,
    maxWidth: 360,
    marginTop: 0,
    marginLeft: videoMargin
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 480
  }
});

const Video = styled.div({
  paddingTop: `${(9 / 16) * 100}%`,
  backgroundColor: theme.palette.grey[900],
  position: 'relative'
});

const StyledIframe = withProps({
  allowFullScreen: true,
  allow: 'autoplay; encrypted-media',
  frameBorder: 0
})(
  styled.iframe({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  })
);

const VideoCaption = withProps({variant: 'caption'})(
  styled(Typography)({
    marginTop: theme.spacing.unit
  })
);

const Text = defaultProps({
  component: 'p',
  variant: 'subheading'
})(Typography);

const now = Date.now();
const unknown = 'Unknown';
class Bio extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    localize: PropTypes.func.isRequired,
    matchMessage: PropTypes.func.isRequired
  };

  renderVideo() {
    if (this.props.candidate.video_url) {
      const youtubeId = getYouTubeId(this.props.candidate.video_url);
      const {message: caption} = this.props.matchMessage(
        this.props.candidate.captions
      );
      if (youtubeId) {
        return (
          <VideoContainer>
            <Video>
              <StyledIframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
              />
            </Video>
            {caption && <VideoCaption>{caption.text}</VideoCaption>}
          </VideoContainer>
        );
      }
    }

    return null;
  }

  render() {
    const {message: bio} = this.props.matchMessage(this.props.candidate.bios);
    return (
      <Section small>
        <Typography gutterBottom variant="display1">
          {this.props.localize('About {{name}}', {
            name: this.props.candidate.firstName
          })}
        </Typography>
        <Content>
          <InnerContent>
            <Text gutterBottom>
              {this.props.candidate.birth_date
                ? this.props.localize('{{age}} years old', {
                    age: differenceInYears(now, this.props.candidate.birth_date)
                  })
                : unknown}
            </Text>
            <Text gutterBottom={Boolean(bio)}>
              {this.props.localize('Hometown: {{name}}', {
                name: this.props.candidate.hometown || unknown
              })}
            </Text>
            {bio && (
              <ReactMarkdown
                allowedTypes={['paragraph', 'strong', 'emphasis']}
                renderers={{paragraph: Text}}
                source={bio.text}
              />
            )}
          </InnerContent>
          {this.renderVideo()}
        </Content>
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  localize: getLocalize(state),
  matchMessage: getMatchMessage(state)
});

export default connect(mapStateToProps)(Bio);
