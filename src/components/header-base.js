import PropTypes from 'prop-types';
import React from 'react';
import {AppBar, Box, styled, useTheme} from '@material-ui/core';
import {Link} from 'gatsby';
import {ReactComponent as Logo} from '../assets/logo.svg';

const StyledLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  fontSize: 34,
  textDecoration: 'none',
  overflow: 'hidden'
});

const StyledLogo = styled(Logo)({
  flexShrink: 0
});

export const HEADER_HEIGHT = 64;

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
        height={HEADER_HEIGHT}
        px={{
          xs: 2,
          sm: paddingX
        }}
        maxWidth={breakpoints.values.lg - (64 - spacing(paddingX)) * 2}
        mx="auto"
      >
        <StyledLink to={props.link}>
          <StyledLogo height="1em" fill={palette.text.primary} />
          <Box
            ml="calc(1em / 3)"
            fontSize="75%"
            fontFamily="h5.fontFamily"
            fontWeight="h5.fontWeight"
            style={{whiteSpace: 'nowrap'}}
          >
            {props.title}
          </Box>
        </StyledLink>
        <Box display="flex" alignItems="center" flexShrink={0}>
          {props.children}
        </Box>
      </Box>
    </AppBar>
  );
}

HeaderBase.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

HeaderBase.defaultProps = {
  link: '/',
  title: 'Pollenize'
};
