import theme from './theme';
import {css, injectGlobal} from 'react-emotion';

export const maxWidth = theme.breakpoints.values.lg;
export const centered = css({
  maxWidth,
  width: '100%',
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
