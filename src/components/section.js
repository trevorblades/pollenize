import styled from 'react-emotion';
import theme from '../theme';
import {centered} from '../styles';

export const SECTION_PADDING = theme.spacing.unit * 8;
export const SECTION_PADDING_SMALL = theme.spacing.unit * 6;
const Section = styled.div(
  props => props.centered && centered,
  props => ({padding: props.small ? SECTION_PADDING_SMALL : SECTION_PADDING})
);

export default Section;
