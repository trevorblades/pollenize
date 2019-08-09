import HeaderBase from './header-base';
import React from 'react';
import {Button, Link as MuiLink} from '@material-ui/core';
import {FaChevronRight} from 'react-icons/fa';
import {Link} from 'gatsby';
import {compose, mapProps} from 'recompose';
import {withStyles} from '@material-ui/styles';

const MenuItem = compose(
  withStyles(theme => ({
    menuItem: {
      marginRight: theme.spacing(3)
    }
  })),
  mapProps(({classes, ...props}) => ({
    component: Link,
    className: classes.menuItem,
    variant: 'body1',
    color: 'inherit',
    ...props
  }))
)(MuiLink);

export default function Header() {
  return (
    <HeaderBase>
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
