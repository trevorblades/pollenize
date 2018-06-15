import Election from './election';
import Elections from './elections';
import Home from './home';
import NotFound from './not-found';
import React from 'react';
import {Switch, Route} from 'react-router-dom';

const Pages = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/elections" component={Elections} />
    <Route path="/elections/:id" component={Election} />
    <Route component={NotFound} />
  </Switch>
);

export default Pages;
