import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import {Menu, MenuItem} from '@material-ui/core';
import {languages, useLanguage} from '../../utils/language';

export default function LanguageMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const {language, setLanguage} = useLanguage();

  function openMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  return (
    <Fragment>
      {props.renderButton(openMenu)}
      <Menu onClose={closeMenu} anchorEl={anchorEl} open={Boolean(anchorEl)}>
        {Object.entries(languages).map(([code, name]) => (
          <MenuItem
            key={code}
            selected={language === code}
            onClick={() => {
              setLanguage(code);
              closeMenu();
            }}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}

LanguageMenu.propTypes = {
  renderButton: PropTypes.func.isRequired
};
