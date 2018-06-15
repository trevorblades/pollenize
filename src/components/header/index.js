import ElectionNav from './election-nav';
import Logo from '../../assets/logo.svg';
import Nav from './nav';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Wordmark from '../../assets/wordmark.svg';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {Link, Switch, Route} from 'react-router-dom';
import {size} from 'polished';

const logoHeight = theme.spacing.unit * 4;
const verticalPadding = theme.spacing.unit * 2.5;
export const HEADER_HEIGHT = logoHeight + verticalPadding * 2;

const Container = withProps({
  elevation: 1,
  square: true
})(
  styled(Paper)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${verticalPadding}px ${theme.spacing.unit * 3}px`,
    position: 'sticky',
    top: 0,
    zIndex: 1
  })
);

const LogoLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0
});

const StyledLogo = styled(Logo)(size(logoHeight), {
  flexShrink: 0
});

const StyledWordmark = styled(Wordmark)({
  flexShrink: 0,
  height: logoHeight / 2,
  marginLeft: logoHeight * 0.375
});

const Header = () => (
  <Container>
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
  </Container>
);

export default Header;
