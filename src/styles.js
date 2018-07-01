import theme from './theme';
import {css, injectGlobal} from 'react-emotion';

export const centered = css({
  width: '100%',
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto'
});

export default () =>
  injectGlobal({
    [['html', 'body']]: {
      height: '100%'
    },
    '#root': {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    },
    a: {
      color: 'inherit',
      outline: 'none',
      ':hover': {
        textDecoration: 'none'
      }
    }
  });
