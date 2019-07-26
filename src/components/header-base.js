import PropTypes from 'prop-types';
import React from 'react';
import {AppBar, Box, Typography} from '@material-ui/core';
import {Link} from 'gatsby';
import {ReactComponent as Logo} from '../assets/logo.svg';
import {styled, useTheme} from '@material-ui/styles';

const Title = styled(Typography)({
  marginLeft: 14,
  fontSize: 26,
  lineHeight: 1,
  letterSpacing: -0.5
});

const StyledLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  textDecoration: 'none'
});

export default function HeaderBase(props) {
  const {breakpoints, spacing, palette} = useTheme();
  const paddingX = 3;
  return (
    <AppBar elevation={0} color="inherit" position="sticky">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width={1}
        height={64}
        px={paddingX}
        maxWidth={breakpoints.values.lg - (64 - spacing(paddingX)) * 2}
        mx="auto"
      >
        <StyledLink to={props.link}>
          <Logo height={36} fill={palette.text.primary} />
          <Title variant="h3">{props.title}</Title>
        </StyledLink>
        <Box display="flex" alignItems="center">
          {props.children}
        </Box>
      </Box>
    </AppBar>
  );
}

HeaderBase.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

HeaderBase.defaultProps = {
  link: '/'
};
