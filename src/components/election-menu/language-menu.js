import React, {Fragment, useContext, useState} from 'react';
import {IconButton, Menu, MenuItem, Tooltip} from '@material-ui/core';
import {LanguageContext, languages} from '../../utils/language';
import {MdTranslate} from 'react-icons/md';

export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useContext(LanguageContext);

  function openMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  return (
    <Fragment>
      <Tooltip
        title={language === 'en' ? 'Change language' : 'Changer de langue'}
      >
        <IconButton color="inherit" onClick={openMenu}>
          <MdTranslate size={24} />
        </IconButton>
      </Tooltip>
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
