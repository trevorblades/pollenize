import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import {Box, IconButton, Menu, MenuItem, Tooltip} from '@material-ui/core';
import {Link} from 'gatsby';
import {useLanguage} from '../utils/language';

export function LanguageMenuBase(props) {
  const {lang, languages, getPathForLanguage} = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);

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
        {languages.map(({code, name}) => (
          <MenuItem
            key={code}
            selected={lang === code}
            component={Link}
            to={getPathForLanguage(code)}
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
  const {lang, localize} = useLanguage();
  return (
    <LanguageMenuBase
      renderButton={openMenu => (
        <Tooltip title={localize('Change language', 'Changer de langue')}>
          {/* wrap in a div because LanguageButtonBase can't take refs */}
          <div>
            <LanguageButtonBase lang={lang} onClick={openMenu} />
          </div>
        </Tooltip>
      )}
    />
  );
}

export function LanguageButtonBase(props) {
  return (
    <IconButton color="inherit" onClick={props.onClick}>
      <Box
        width={24}
        height={24}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontFamily="fontFamily"
        fontSize={18}
        fontWeight={500}
      >
        {props.lang.toUpperCase()}
      </Box>
    </IconButton>
  );
}

LanguageButtonBase.propTypes = {
  onClick: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired
};
