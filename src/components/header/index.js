import ElectionNav from './election-nav';
import Logo from '../../assets/logo.svg';
import Nav from './nav';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {Link, Switch, Route} from 'react-router-dom';

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

const StyledLogo = styled(Logo)({
  display: 'block',
  flexShrink: 0,
  height: logoHeight
});

const Header = () => (
  <Container>
    <Link to="/">
      <StyledLogo />
    </Link>
    <Switch>
      <Route path="/elections/:id" component={ElectionNav} />
      <Route component={Nav} />
    </Switch>
  </Container>
);

export default Header;
