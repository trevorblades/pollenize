import Elections from './elections';
import Invitation from './invitation';
import Footer from '../components/footer';
import Header from '../components/header';
import Home from './home';
import NotFound from './not-found';
import React, {Fragment} from 'react';
import Team from './team';
import {Switch, Route} from 'react-router-dom';

const Pages = () => (
  <Fragment>
    <Header centered />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/team" component={Team} />
      <Route exact path="/elections" component={Elections} />
      <Route exact path="/invitation" component={Invitation} />
      <Route render={NotFound} />
    </Switch>
    <Footer />
  </Fragment>
);

export default Pages;
