import styled, {css} from 'react-emotion';
import theme from '../theme';
import {centered} from '../styles';

const SECTION_PADDING = theme.spacing.unit * 8;
export const SECTION_PADDING_SMALL = theme.spacing.unit * 6;
export const SECTION_PADDING_SMALLER = theme.spacing.unit * 4;
export const breakpoint = 'xs';
const Section = styled.div(props =>
  css(props.centered && centered, {
    padding: props.small ? SECTION_PADDING_SMALL : SECTION_PADDING,
    [theme.breakpoints.down(breakpoint)]: {
      padding: props.small ? SECTION_PADDING_SMALLER : SECTION_PADDING_SMALL
    }
  })
);

export function getSectionPadding(width, small) {
  if (width < theme.breakpoints.values[breakpoint]) {
    return small ? SECTION_PADDING_SMALLER : SECTION_PADDING_SMALL;
  }
  return small ? SECTION_PADDING_SMALL : SECTION_PADDING;
}

export default Section;
