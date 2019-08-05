import DrawerContent from './drawer-content';
import LanguageMenu from './language-menu';
import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import {Drawer, IconButton, Tooltip} from '@material-ui/core';
import {FaRegComments, FaThLarge} from 'react-icons/fa';
import {FiMenu} from 'react-icons/fi';
import {Link} from 'gatsby';
import {MdTranslate} from 'react-icons/md';
import {makeStyles} from '@material-ui/styles';
import {useLanguage} from '../../utils/language';

const useStyles = makeStyles({
  paper: {
    width: 350
  }
});

export default function ElectionMenu(props) {
  const {paper} = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {localize} = useLanguage();

  function openDrawer() {
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  const electionPath = `/elections/${props.electionSlug}`;
  return (
    <Fragment>
      <Tooltip title={localize('Candidate grid', 'Grille de candidats')}>
        <IconButton
          component={Link}
          to={electionPath}
          color={props.candidateGridActive ? 'primary' : 'inherit'}
        >
          <FaThLarge style={{margin: 2}} size={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title={localize('Topic explorer', 'Explorateur de sujets')}>
        <IconButton
          component={Link}
          to={`${electionPath}/topics`}
          color={props.topicExplorerActive ? 'primary' : 'inherit'}
        >
          <FaRegComments />
        </IconButton>
      </Tooltip>
      <LanguageMenu
        renderButton={openMenu => (
          <Tooltip title={localize('Change language', 'Changer de langue')}>
            <IconButton color="inherit" onClick={openMenu}>
              <MdTranslate />
            </IconButton>
          </Tooltip>
        )}
      />
      <IconButton onClick={openDrawer} color="inherit">
        <FiMenu />
      </IconButton>
      <Drawer
        classes={{paper}}
        anchor="right"
        onClose={closeDrawer}
        open={drawerOpen}
      >
        <DrawerContent
          candidates={props.candidates}
          electionSlug={props.electionSlug}
          title={props.title}
          partyFirst={props.partyFirst}
        />
      </Drawer>
    </Fragment>
  );
}

ElectionMenu.propTypes = {
  title: PropTypes.string.isRequired,
  electionSlug: PropTypes.string.isRequired,
  candidates: PropTypes.array.isRequired,
  partyFirst: PropTypes.bool.isRequired,
  topicExplorerActive: PropTypes.bool,
  candidateGridActive: PropTypes.bool
};
