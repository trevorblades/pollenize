import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../theme';

const Container = styled.footer({
  padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
  backgroundColor: theme.palette.grey[100]
});

const Footer = () => (
  <Container>
    <Typography>&copy; Pollenize</Typography>
  </Container>
);

export default Footer;
