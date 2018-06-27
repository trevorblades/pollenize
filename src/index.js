import App from './components/app';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import styles from './styles';
import theme from './theme';
import {JssProvider} from 'react-jss';
import {Provider} from 'react-redux';
import {
  MuiThemeProvider,
  createGenerateClassName,
  jssPreset
} from '@material-ui/core/styles';
import {create} from 'jss';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {install} from 'redux-loop';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';

const history = createHistory({basename: process.env.PUBLIC_PATH});
const middleware = routerMiddleware(history);
const enhancer = composeWithDevTools(install(), applyMiddleware(middleware));
const store = createStore(reducers, enhancer);

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
// we define a custom insertion point JSS will look for injecting the styles in the DOM
jss.options.insertionPoint = 'jss-insertion-point';

styles();
ReactDOM.render(
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </MuiThemeProvider>
    </JssProvider>
  </Provider>,
  document.getElementById('root')
);
