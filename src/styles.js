import {injectGlobal} from 'react-emotion';

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
