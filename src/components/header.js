import HeaderBase from './header-base';
import React from 'react';
import {Button, Link as MuiLink} from '@material-ui/core';
import {FaChevronRight} from 'react-icons/fa';
import {Link} from 'gatsby';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  menuItem: {
    marginRight: theme.spacing(3)
  }
}));

function MenuItem(props) {
  const {menuItem} = useStyles();
  return (
    <MuiLink
      component={Link}
      className={menuItem}
      variant="body1"
      color="inherit"
      {...props}
    />
  );
}

export default function Header() {
  return (
    <HeaderBase title="Pollenize">
      <MenuItem to="/elections">Elections</MenuItem>
      <MenuItem to="/team">Team</MenuItem>
      <MenuItem to="/blog">Blog</MenuItem>
      <Button component={Link} to="/elections/canada-2019" variant="outlined">
        Canada 2019
        <FaChevronRight style={{marginLeft: 8}} />
      </Button>
    </HeaderBase>
  );
}
