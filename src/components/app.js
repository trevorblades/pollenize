import CssBaseline from '@material-ui/core/CssBaseline';
import Election from '../pages/election';
import Helmet from 'react-helmet';
import Pages from '../pages';
import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import {hot} from 'react-hot-loader';

const App = () => (
  <Fragment>
    <CssBaseline />
    <Helmet
      defaultTitle={process.env.APP_TITLE}
      titleTemplate={`%s · ${process.env.APP_TITLE}`}
    />
    <Switch>
      <Route path="/elections/:id" component={Election} />
      <Route component={Pages} />
    </Switch>
  </Fragment>
);

export default hot(module)(App);
