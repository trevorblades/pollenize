import PropTypes from 'prop-types';
import React from 'react';
import {AppBar, Box, Typography} from '@material-ui/core';
import {Link} from 'gatsby';
import {ReactComponent as Logo} from '../assets/logo.svg';
import {styled, useTheme} from '@material-ui/styles';

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
          <Logo height={34} fill={palette.text.primary} />
          <Typography
            variant="h5"
            style={{
              marginLeft: 14
            }}
          >
            {props.title}
          </Typography>
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
