import Elections from './elections';
import Header from '../components/header';
import Home from './home';
import NotFound from './not-found';
import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';

const Pages = () => (
  <Fragment>
    <Header centered />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/elections" render={Elections} />
      <Route render={NotFound} />
    </Switch>
  </Fragment>
);

export default Pages;
