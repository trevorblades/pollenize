import React from 'react';
import {AppBar, Box, Typography} from '@material-ui/core';
import {ReactComponent as Logo} from '../assets/logo.svg';
import {styled, useTheme} from '@material-ui/styles';

const paddingX = 3;
const Title = styled(Typography)({
  marginLeft: 14,
  fontSize: 27,
  letterSpacing: -0.5
});

export default function Header() {
  const {breakpoints, spacing, palette} = useTheme();
  return (
    <AppBar elevation={0} color="inherit" position="sticky">
      <Box
        display="flex"
        alignItems="center"
        width={1}
        height={64}
        px={paddingX}
        maxWidth={breakpoints.values.lg - (64 - spacing(paddingX)) * 2}
        mx="auto"
      >
        <Logo height={36} fill={palette.text.primary} />
        <Title variant="h3">Pollenize</Title>
      </Box>
    </AppBar>
  );
}
