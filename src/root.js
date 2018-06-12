import CssBaseline from '@material-ui/core/CssBaseline';
import App from './components/app';
import React, {Fragment} from 'react';
import theme from './theme';
import {JssProvider} from 'react-jss';
import {
  MuiThemeProvider,
  createGenerateClassName,
  jssPreset
} from '@material-ui/core/styles';
import {create} from 'jss';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
// we define a custom insertion point JSS will look for injecting the styles in the DOM
jss.options.insertionPoint = 'jss-insertion-point';

const Root = () => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Fragment>
        <CssBaseline />
        <App />
      </Fragment>
    </MuiThemeProvider>
  </JssProvider>
);

export default Root;
