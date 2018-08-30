import AppBar from '@material-ui/core/AppBar';
import LogoWithWordmark from './logo-with-wordmark';
import Navigation from './navigation';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import styled, {css} from 'react-emotion';
import theme from '../theme';
import {Link} from 'react-router-dom';
import {centered} from '../styles';

const darkClassName = css({
  color: theme.palette.grey[50],
  backgroundColor: theme.palette.grey[900]
});

export const HEADER_LOGO_SIZE = 30;
const LogoLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0
});

const StyledNavigation = styled(Navigation)({
  marginRight: theme.spacing.unit
});

class Header extends Component {
  static propTypes = {
    centered: PropTypes.bool,
    children: PropTypes.node,
    dark: PropTypes.bool,
    logoHref: PropTypes.string,
    simple: PropTypes.bool
  };

  static defaultProps = {
    logoHref: '/'
  };

  renderLogo() {
    const logo = (
      <LogoWithWordmark height={HEADER_LOGO_SIZE} simple={this.props.simple} />
    );
    if (this.props.logoHref) {
      return <LogoLink to={this.props.logoHref}>{logo}</LogoLink>;
    }
    return logo;
  }

  render() {
    return (
      <AppBar
        elevation={1}
        color="inherit"
        position="sticky"
        className={this.props.dark && darkClassName}
      >
        <Toolbar className={this.props.centered && centered}>
          {this.renderLogo()}
          {this.props.children || <StyledNavigation withActive />}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
