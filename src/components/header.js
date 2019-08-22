import HeaderBase from './header-base';
import React from 'react';
import {withStyles} from '@material-ui/core';
// import {FaChevronRight} from 'react-icons/fa';
import {Link} from 'gatsby-theme-material-ui';
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
      <MenuItem to="/elections">Elections</MenuItem>
      <MenuItem to="/team">Team</MenuItem>
      <MenuItem to="/blog">Blog</MenuItem>
      {/* <Button component={Link} to="/elections/canada-2019" variant="outlined">
        Canada 2019
        <FaChevronRight style={{marginLeft: 8}} />
      </Button> */}
    </HeaderBase>
  );
}
