import Elections from './elections';
import Footer from '../components/footer';
import Header from '../components/header';
import Home from './home';
import Invitation from './invitation';
import NotFound from './not-found';
import React, {Fragment} from 'react';
import Team from './team';
import {Redirect, Route, Switch} from 'react-router-dom';

const Pages = () => (
  <Fragment>
    <Header centered />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/team" component={Team} />
      <Route exact path="/elections" component={Elections} />
      <Route exact path="/invitation" component={Invitation} />
      <Redirect from="/canada" to="/elections/canada-2015" />
      <Redirect from="/toronto" to="/elections/toronto-2018" />
      <Redirect from="/ottawa" to="/elections/ottawa-2018" />
      <Route render={NotFound} />
    </Switch>
    <Footer />
  </Fragment>
);

export default Pages;
