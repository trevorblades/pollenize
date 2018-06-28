import theme from '../../../theme';
import {css} from 'react-emotion';

export const SECTION_MAX_WIDTH = 960;
export const SECTION_VERTICAL_PADDING = theme.spacing.unit * 5;
export const sectionClassName = css({
  padding: `${SECTION_VERTICAL_PADDING}px ${theme.spacing.unit * 6}px`
});

export const TOPIC_IMAGE_ASPECT_RATIO = 15 / 4;
