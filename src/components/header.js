import Logo from '../assets/logo.svg';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import styled from 'react-emotion';
import theme from '../theme';
import {size} from 'polished';

const Container = styled(Paper)({
  padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
  position: 'sticky',
  top: 0
});

const StyledLogo = styled(Logo)(size(theme.spacing.unit * 4.5));

const Header = () => (
  <Container>
    <StyledLogo />
  </Container>
);

export default Header;
