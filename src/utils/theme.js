import {createMuiTheme} from '@material-ui/core';

const headingStyles = {
  fontFamily: ["'Helvetica Neue'", 'Helvetica', 'sans-serif'].toString(),
  fontWeight: 700
};

const theme = createMuiTheme({
  typography: {
    fontFamily: ["'Roboto Mono'", 'monospace'].toString(),
    h1: headingStyles,
    h2: headingStyles,
    h3: headingStyles,
    h6: {
      fontWeight: 400
    },
    overline: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: 2
    }
  }
});

export default theme;
