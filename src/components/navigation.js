import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/defaultProps';
import styled, {css} from 'react-emotion';
import theme from '../theme';
import {Link, NavLink} from 'react-router-dom';

const Container = styled.nav({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto'
});

const ItemBase = defaultProps({
  color: 'inherit',
  variant: 'subheading',
  noWrap: true
})(
  styled(Typography)({
    textDecoration: 'none',
    ':not(:last-child)': {
      marginRight: theme.spacing.unit * 3
    }
  })
);

const hover = css({
  ':hover': {
    opacity: 0.75
  }
});

const NavlessItem = defaultProps({component: Link})(styled(ItemBase)(hover));
const NavItem = defaultProps({component: NavLink})(
  styled(ItemBase)({
    ':not(.active)': css({opacity: 0.5}, hover)
  })
);

const Navigation = props => {
  const Item = props.withActive ? NavItem : NavlessItem;
  return (
    <Container className={props.className}>
      <Item exact={props.withActive} to="/">
        Home
      </Item>
      <Item to="/elections">Elections</Item>
      <Item to="/about">About us</Item>
      <Item
        component="a"
        href="https://medium.com/pollenize"
        rel="noopener noreferrer"
        target="_blank"
      >
        Blog
      </Item>
    </Container>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  withActive: PropTypes.bool
};

export default Navigation;
