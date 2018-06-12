import Logo from '../assets/logo.svg';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled, {css} from 'react-emotion';
import theme from '../theme';
import withProps from 'recompose/withProps';
import {NavLink} from 'react-router-dom';

const flexAlignCenter = css({
  display: 'flex',
  alignItems: 'center'
});

const Container = styled(Paper)(flexAlignCenter, {
  justifyContent: 'space-between',
  padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
  position: 'sticky',
  top: 0
});

const StyledLogo = styled(Logo)({
  display: 'block',
  height: theme.spacing.unit * 4.5
});

const StyledNav = styled.nav(flexAlignCenter, {
  margin: `0 ${theme.spacing.unit * 1.5}px`,
  color: theme.palette.grey[400]
});

const NavItem = withProps({
  component: NavLink,
  variant: 'subheading',
  color: 'inherit'
})(
  styled(Typography)({
    textDecoration: 'none',
    ':not(:last-child)': {
      marginRight: theme.spacing.unit * 3
    },
    ':hover': {
      color: theme.palette.grey[700]
    },
    '&.active': {
      color: theme.palette.common.black
    }
  })
);

const Header = () => (
  <Container>
    <StyledLogo />
    <StyledNav>
      <NavItem exact to="/">
        Home
      </NavItem>
      <NavItem to="/elections">Elections</NavItem>
      <NavItem to="/about">About us</NavItem>
      <NavItem to="/blog">Blog</NavItem>
    </StyledNav>
  </Container>
);

export default Header;
