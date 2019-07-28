import LanguageMenu from './language-menu';
import React, {Fragment} from 'react';
import {FaBars} from 'react-icons/fa';
import {IconButton} from '@material-ui/core';

export default function ElectionMenu() {
  return (
    <Fragment>
      <LanguageMenu />
      <IconButton color="inherit">
        <FaBars size={24} />
      </IconButton>
    </Fragment>
  );
}
