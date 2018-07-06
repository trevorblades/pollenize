import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Section from '../../../components/section';
import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/defaultProps';
import differenceInYears from 'date-fns/differenceInYears';
import getYouTubeId from 'get-youtube-id';
import styled from 'react-emotion';
import theme from '../../../theme';
import withProps from 'recompose/withProps';

const breakpoint = theme.breakpoints.up('md');
const Content = styled.div({
  [breakpoint]: {
    display: 'flex',
    alignItems: 'flex-start'
  }
});

const videoMargin = theme.spacing.unit * 3;
const VideoContainer = styled.div({
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
  width: '100%',
  paddingTop: `${(9 / 16) * 100}%`,
  position: 'relative'
});

const StyledIframe = styled.iframe({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0
});

const VideoCaption = withProps({variant: 'caption'})(
  styled(Typography)({
    marginTop: theme.spacing.unit
  })
);

const Text = defaultProps({
  component: 'p',
  variant: 'subheading',
  gutterBottom: true
})(Typography);

const now = Date.now();
const unknown = 'Unknown';
export default class Bio extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired
  };

  renderVideo() {
    if (this.props.candidate.video_url) {
      const youtubeId = getYouTubeId(this.props.candidate.video_url);
      if (youtubeId) {
        return (
          <VideoContainer>
            <Video>
              <StyledIframe
                allowFullScreen
                allow="autoplay; encrypted-media"
                frameBorder={0}
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&amp;showinfo=0`}
              />
            </Video>
            {this.props.candidate.video_caption && (
              <VideoCaption>{this.props.candidate.video_caption}</VideoCaption>
            )}
          </VideoContainer>
        );
      }
    }

    return null;
  }

  render() {
    return (
      <Section small>
        <Typography gutterBottom variant="display1">
          About {this.props.candidate.firstName}
        </Typography>
        <Content>
          <div>
            <Text>
              Age:{' '}
              {this.props.candidate.birth_date
                ? `${differenceInYears(
                    now,
                    this.props.candidate.birth_date
                  )} years`
                : unknown}
            </Text>
            <Text>Hometown: {this.props.candidate.hometown || unknown}</Text>
            {this.props.candidate.bio && (
              <Text gutterBottom={false}>{this.props.candidate.bio}</Text>
            )}
          </div>
          {this.renderVideo()}
        </Content>
      </Section>
    );
  }
}
