import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {NavLink} from 'react-router-dom';

const Container = styled.nav({
  display: 'flex',
  alignItems: 'center',
  margin: `0 ${theme.spacing.unit * 1.5}px`,
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

const Nav = () => (
  <Container>
    <NavItem exact to="/">
      Home
    </NavItem>
    <NavItem to="/elections">Elections</NavItem>
    <NavItem to="/about">About us</NavItem>
    <NavItem to="/blog">Blog</NavItem>
  </Container>
);

export default Nav;
