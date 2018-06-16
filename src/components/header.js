import AppBar from '@material-ui/core/AppBar';
import Logo from '../assets/logo.svg';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Wordmark from '../assets/wordmark.svg';
import styled, {css} from 'react-emotion';
import theme from '../theme';
import withProps from 'recompose/withProps';
import {Link, NavLink} from 'react-router-dom';
import {size} from 'polished';

const darkClassName = css({
  color: theme.palette.grey[50],
  backgroundColor: theme.palette.grey[900]
});

const LogoLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  color: 'inherit'
});

const logoClassName = css({
  flexShrink: 0,
  fill: 'currentColor'
});

export const logoSize = 30;
const StyledLogo = styled(Logo)(logoClassName, size(logoSize));
const StyledWordmark = styled(Wordmark)(logoClassName, {
  height: 16,
  marginLeft: 12
});

const Nav = styled.nav({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  color: theme.palette.grey[400]
});

const NavItem = withProps({
  component: NavLink,
  variant: 'subheading',
  color: 'inherit',
  noWrap: true
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

const Header = props => (
  <AppBar
    elevation={1}
    color="inherit"
    position="sticky"
    className={props.dark && darkClassName}
  >
    <Toolbar>
      <LogoLink to="/">
        <StyledLogo />
        {!props.simple && <StyledWordmark />}
      </LogoLink>
      {props.children || (
        <Nav>
          <NavItem exact to="/">
            Home
          </NavItem>
          <NavItem to="/elections">Elections</NavItem>
          <NavItem to="/about">About us</NavItem>
          <NavItem to="/blog">Blog</NavItem>
        </Nav>
      )}
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  children: PropTypes.node,
  dark: PropTypes.bool,
  simple: PropTypes.bool
};

export default Header;
