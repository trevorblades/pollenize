import React from 'react';
import {AppBar, Box, Button, Typography} from '@material-ui/core';
import {FaChevronRight} from 'react-icons/fa';
import {Link} from 'gatsby';
import {ReactComponent as Logo} from '../assets/logo.svg';
import {makeStyles, styled, useTheme} from '@material-ui/styles';

const paddingX = 3;
const StyledTypography = styled(Typography)({
  marginLeft: 14,
  fontSize: 27,
  letterSpacing: -0.5
});

const StyledLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  textDecoration: 'none'
});

const useStyles = makeStyles(theme => ({
  menuItem: {
    marginRight: theme.spacing(3),
    '&:not(:hover)': {
      textDecoration: 'none'
    }
  }
}));

export default function Header() {
  const {menuItem} = useStyles();
  const {breakpoints, spacing, palette} = useTheme();
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
        <StyledLink to="/">
          <Logo height={36} fill={palette.text.primary} />
          <StyledTypography variant="h3">Pollenize</StyledTypography>
        </StyledLink>
        <Box display="flex" alignItems="center">
          <Typography
            className={menuItem}
            component={Link}
            color="textPrimary"
            to="/team"
          >
            Team
          </Typography>
          <Typography
            className={menuItem}
            component="a"
            color="textPrimary"
            href="https://medium.com/pollenize"
          >
            Blog
          </Typography>
          <Button
            component={Link}
            to="/elections"
            variant="outlined"
            color="primary"
          >
            Elections
            <FaChevronRight style={{marginLeft: 8}} />
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
}
