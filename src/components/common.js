import PropTypes from 'prop-types';
import React from 'react';
import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  useTheme,
  withTheme
} from '@material-ui/core';
import {HEADER_HEIGHT} from './header-base';
import {compose, mapProps, withProps} from 'recompose';

export const PageAnchor = withProps({
  component: 'a',
  display: 'block',
  height: HEADER_HEIGHT,
  mt: `${-HEADER_HEIGHT}px`
})(Box);

export const FormField = withProps({
  fullWidth: true,
  margin: 'normal'
})(TextField);

export const SectionWrapper = compose(
  withTheme,
  mapProps(({theme, ...props}) => ({
    maxWidth: theme.breakpoints.values.lg,
    mx: 'auto',
    p: 8,
    ...props
  }))
)(Box);

const contentWrapperPaddingRightXs = 5;
const contentWrapperPaddingRightLg = 8;
const contentWrapperPaddingDelta =
  contentWrapperPaddingRightLg - contentWrapperPaddingRightXs;

export const ContentWrapper = withProps({
  py: {
    xs: 5,
    lg: 7
  },
  pr: {
    xs: contentWrapperPaddingRightXs,
    lg: contentWrapperPaddingRightLg
  },
  pl: {
    xs: 5,
    md: 0
  }
})(Box);

export function PageWrapper(props) {
  const {breakpoints, spacing} = useTheme();
  const {lg} = breakpoints.values;
  return (
    <Box
      maxWidth={{
        md: lg - spacing(contentWrapperPaddingDelta * 2),
        lg
      }}
      mx="auto"
    >
      <Grid container>
        <Grid item xs={12} md={4} lg={3}>
          {props.sidebar}
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          {props.children}
        </Grid>
      </Grid>
    </Box>
  );
}

PageWrapper.propTypes = {
  sidebar: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};

export function PageHeader({children, title, subtitle, ...props}) {
  return (
    <Box
      p={{
        xs: 5,
        md: 7
      }}
      textAlign="center"
      {...props}
    >
      {children}
      <Typography paragraph variant="h3">
        {title}
      </Typography>
      {subtitle && <Typography variant="h6">{subtitle}</Typography>}
    </Box>
  );
}

PageHeader.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export function FormCard(props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={`calc(100vh - ${HEADER_HEIGHT}px)`}
    >
      <Box maxWidth={500} mx={3}>
        <Card raised>{props.children}</Card>
      </Box>
    </Box>
  );
}

FormCard.propTypes = {
  children: PropTypes.node.isRequired
};
