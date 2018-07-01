import AppBar from '@material-ui/core/AppBar';
import Logo from '../assets/logo.svg';
import Navigation from './navigation';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Wordmark from '../assets/wordmark.svg';
import styled, {css} from 'react-emotion';
import theme from '../theme';
import {Link} from 'react-router-dom';
import {centered} from '../styles';
import {size} from 'polished';

const darkClassName = css({
  color: theme.palette.grey[50],
  backgroundColor: theme.palette.grey[900]
});

const LogoLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0
});

const logoClassName = css({
  flexShrink: 0,
  fill: 'currentColor'
});

export const HEADER_LOGO_SIZE = 30;
const StyledLogo = styled(Logo)(logoClassName, size(HEADER_LOGO_SIZE));
const StyledWordmark = styled(Wordmark)(logoClassName, {
  height: 16,
  marginLeft: 12
});

const StyledNavigation = styled(Navigation)({
  marginRight: theme.spacing.unit
});

const Header = props => (
  <AppBar
    elevation={1}
    color="inherit"
    position="sticky"
    className={props.dark && darkClassName}
  >
    <Toolbar className={props.centered && centered}>
      <LogoLink to="/">
        <StyledLogo />
        {!props.simple && <StyledWordmark />}
      </LogoLink>
      {props.children || <StyledNavigation withActive />}
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.node,
  dark: PropTypes.bool,
  simple: PropTypes.bool
};

export default Header;
