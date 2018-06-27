import round from 'lodash/round';
import theme from '../../../theme';
import {css} from 'react-emotion';

export const SECTION_VERTICAL_PADDING = theme.spacing.unit * 5;
export const sectionClassName = css({
  padding: `${SECTION_VERTICAL_PADDING}px ${theme.spacing.unit * 6}px`
});

export const TOPIC_IMAGE_ASPECT_RATIO = 3;
export const topicImageClassName = css({
  paddingTop: `${round((1 / TOPIC_IMAGE_ASPECT_RATIO) * 100, 3)}%`
});
