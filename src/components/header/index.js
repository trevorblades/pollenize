import AppBar from '@material-ui/core/AppBar';
import ElectionNav from './election-nav';
import Logo from '../../assets/logo.svg';
import Nav from './nav';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Wordmark from '../../assets/wordmark.svg';
import styled from 'react-emotion';
import {Link, Switch, Route} from 'react-router-dom';
import {size} from 'polished';

const LogoLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  marginRight: 'auto'
});

const StyledLogo = styled(Logo)(size(30), {
  flexShrink: 0
});

const StyledWordmark = styled(Wordmark)({
  flexShrink: 0,
  height: 16,
  marginLeft: 12
});

const Header = () => (
  <AppBar color="inherit" position="sticky" elevation={1}>
    <Toolbar>
      <LogoLink to="/">
        <StyledLogo />
        <Switch>
          <Route path="/elections/:id" />
          <Route render={() => <StyledWordmark />} />
        </Switch>
      </LogoLink>
      <Switch>
        <Route path="/elections/:id" component={ElectionNav} />
        <Route component={Nav} />
      </Switch>
    </Toolbar>
  </AppBar>
);

export default Header;
