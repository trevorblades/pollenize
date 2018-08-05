import AppBar from '@material-ui/core/AppBar';
import Logo from '../assets/logo.svg';
import Navigation from './navigation';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
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
      <Fragment>
        <StyledLogo />
        {!this.props.simple && <StyledWordmark />}
      </Fragment>
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
