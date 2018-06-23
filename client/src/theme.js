import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import indigo from '@material-ui/core/colors/indigo';
import {createMuiTheme} from '@material-ui/core/styles';

export default createMuiTheme({
  mixins: {
    toolbar: {
      height: 64
    }
  },
  palette: {
    primary: indigo,
    secondary: blue,
    grey: blueGrey
  },
  typography: {
    fontFamily: ['Lato', 'Helvetica', 'sans-serif'].toString(),
    fontWeightMedium: 700,
    display1: {
      fontSize: '2.5rem',
      fontFamily: ['"Playfair Display"', 'Georgia', 'serif'].toString(),
      fontWeight: 700
    },
    headline: {
      fontSize: '2rem',
      fontFamily: ['"Playfair Display"', 'Georgia', 'serif'].toString(),
      fontWeight: 700
    }
  }
});
