import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import {Box, IconButton, Menu, MenuItem, Tooltip} from '@material-ui/core';
import {Link} from 'gatsby';
import {useLanguage} from '../../utils/language';

export function getPathForLanguage(path, lang) {
  return (
    '/' +
    [
      lang,
      ...path
        .split('/')
        .filter(Boolean)
        .slice(1)
    ].join('/')
  );
}

export function LanguageMenuBase(props) {
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
        {Object.entries(props.languages).map(([code, name]) => (
          <MenuItem
            key={code}
            selected={props.lang === code}
            component={Link}
            to={getPathForLanguage(props.path, code)}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}

LanguageMenuBase.propTypes = {
  lang: PropTypes.string.isRequired,
  languages: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  renderButton: PropTypes.func.isRequired
};

export default function LanguageButton(props) {
  const {localize} = useLanguage();
  return (
    <LanguageMenuBase
      {...props}
      renderButton={openMenu => (
        <Tooltip title={localize('Change language', 'Changer de langue')}>
          <IconButton color="inherit" onClick={openMenu}>
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
        </Tooltip>
      )}
    />
  );
}

LanguageButton.propTypes = {
  lang: PropTypes.string.isRequired
};
