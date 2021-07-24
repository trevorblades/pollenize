import HeaderBase from './header-base';
import React from 'react';
import {Button, Link} from 'gatsby-theme-material-ui';
import {FaChevronRight} from 'react-icons/fa';
import {Hidden, withStyles} from '@material-ui/core';
import {compose, mapProps} from 'recompose';

const MenuItem = compose(
  withStyles(theme => ({
    menuItem: {
      marginRight: theme.spacing(3)
    }
  })),
  mapProps(({classes, ...props}) => ({
    className: classes.menuItem,
    variant: 'body1',
    color: 'inherit',
    ...props
  }))
)(Link);

export default function Header() {
  return (
    <HeaderBase>
      <Hidden xsDown implementation="css">
        <MenuItem to="/elections">Elections</MenuItem>
      </Hidden>
      <Hidden smDown implementation="css">
        <MenuItem to="/team">Team</MenuItem>
        <MenuItem to="/blog">Blog</MenuItem>
      </Hidden>
      <Button color="primary" to="/en/elections/canada-2021" variant="outlined">
        Canada 2021
        <FaChevronRight style={{marginLeft: 8}} />
      </Button>
    </HeaderBase>
  );
}
