import App from './components/app';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import styles from './styles';
import theme from './theme';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {JssProvider} from 'react-jss';
import {Provider} from 'react-redux';
import {
  MuiThemeProvider,
  createGenerateClassName,
  jssPreset
} from '@material-ui/core/styles';
import {configureAnchors} from 'react-scrollable-anchor';
import {create} from 'jss';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {install} from 'redux-loop';

const history = createHistory({basename: PUBLIC_PATH});
const middleware = routerMiddleware(history);
const enhancer = composeWithDevTools(install(), applyMiddleware(middleware));
const store = createStore(reducers, enhancer);

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
// we define a custom insertion point JSS will look for injecting the styles in the DOM
jss.options.insertionPoint = 'jss-insertion-point';

styles();
configureAnchors({
  offset: -theme.mixins.toolbar.height,
  scrollDuration: 0
});

ReactGA.initialize('UA-53329033-1');
ReactDOM.render(
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </JssProvider>
  </Provider>,
  document.getElementById('root')
);
