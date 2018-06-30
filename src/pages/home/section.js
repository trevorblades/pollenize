import styled from 'react-emotion';
import theme from '../../theme';

const Section = styled.div({
  width: '100%',
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto',
  padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 8}px`
});

export default Section;
