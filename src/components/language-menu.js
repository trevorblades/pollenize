import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import {IconButton, Menu, MenuItem, Tooltip} from '@material-ui/core';
import {MdTranslate} from 'react-icons/md';
import {languages, useLanguage} from '../utils/language';

export function LanguageMenuBase(props) {
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

LanguageMenuBase.propTypes = {
  renderButton: PropTypes.func.isRequired
};

export default function LanguageButton() {
  const {localize} = useLanguage();
  return (
    <LanguageMenuBase
      renderButton={openMenu => (
        <Tooltip title={localize('Change language', 'Changer de langue')}>
          <IconButton color="inherit" onClick={openMenu}>
            <MdTranslate />
          </IconButton>
        </Tooltip>
      )}
    />
  );
}
