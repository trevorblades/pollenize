import Helmet from 'react-helmet';
import Header from './header';
import Pages from '../pages';
import React, {Fragment} from 'react';
import {hot} from 'react-hot-loader';

const App = () => (
  <Fragment>
    <Helmet
      defaultTitle={process.env.APP_TITLE}
      titleTemplate={`%s · ${process.env.APP_TITLE}`}
    />
    <Header />
    <Pages />
  </Fragment>
);

export default hot(module)(App);
