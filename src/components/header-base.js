import PropTypes from 'prop-types';
import React from 'react';
import {AppBar, Box, useTheme} from '@material-ui/core';
import {Link} from 'gatsby';
import {ReactComponent as Logo} from '../assets/logo.svg';
import {LogoTitleProps} from '@trevorblades/mui-theme';

export const HEADER_HEIGHT = 64;

export default function HeaderBase(props) {
  const {breakpoints, spacing} = useTheme();
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
        <Box
          {...LogoTitleProps.root}
          color="inherit"
          component={Link}
          to={props.link}
          style={{
            textDecoration: 'none',
            overflow: 'hidden'
          }}
        >
          <Box {...LogoTitleProps.logo} fill="currentColor" component={Logo} />
          <Box
            {...LogoTitleProps.title}
            style={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'inherit'
            }}
          >
            {props.title}
          </Box>
        </Box>
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
