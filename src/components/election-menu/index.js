import DrawerContent from './drawer-content';
import LanguageMenu from './language-menu';
import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Hidden,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import {FaRegComments, FaThLarge} from 'react-icons/fa';
import {FiInfo, FiMenu} from 'react-icons/fi';
import {Link} from 'gatsby';
import {MdTranslate} from 'react-icons/md';
import {languages, useLanguage} from '../../utils/language';
import {makeStyles} from '@material-ui/styles';
import {useLocalStorage} from 'react-use';

const useStyles = makeStyles({
  paper: {
    width: 350
  }
});

export default function ElectionMenu(props) {
  const {paper} = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [introState, setIntroState] = useLocalStorage('intro', {});
  const [dialogOpen, setDialogOpen] = useState(!introState[props.electionSlug]);
  const {localize, language, setLanguage} = useLanguage();

  function openDrawer() {
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  function openDialog() {
    setDialogOpen(true);
  }

  function closeDialog() {
    if (!introState[props.electionSlug]) {
      setIntroState(prevState => ({
        ...prevState,
        [props.electionSlug]: true
      }));
    }

    setDialogOpen(false);
  }

  const electionPath = `/elections/${props.electionSlug}`;
  return (
    <Fragment>
      {props.intro && (
        <Hidden only="xs" implementation="css">
          <IconButton color="inherit" onClick={openDialog}>
            <FiInfo />
          </IconButton>
        </Hidden>
      )}
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
      <Hidden only="xs" implementation="css">
        <LanguageMenu
          renderButton={openMenu => (
            <Tooltip title={localize('Change language', 'Changer de langue')}>
              <IconButton color="inherit" onClick={openMenu}>
                <MdTranslate />
              </IconButton>
            </Tooltip>
          )}
        />
      </Hidden>
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
          onIntroClick={props.intro && openDialog}
        />
      </Drawer>
      {props.intro && (
        <Dialog fullWidth open={dialogOpen} onClose={closeDialog}>
          <DialogTitle disableTypography>
            <Typography variant="overline">
              {localize('Welcome to', 'Bienvenue à')}
            </Typography>
            <Typography variant="h4">Pollenize {props.title}</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{props.intro}</DialogContentText>
            <Typography
              gutterBottom
              display="block"
              color="textSecondary"
              variant="caption"
            >
              Select a language to continue:
            </Typography>
          </DialogContent>
          <DialogActions>
            {Object.entries(languages).map(([key, value]) => (
              <Button
                fullWidth
                variant="outlined"
                size="large"
                key={key}
                color={language === key ? 'primary' : 'default'}
                onClick={() => {
                  setLanguage(key);
                  closeDialog();
                }}
              >
                {value}
              </Button>
            ))}
          </DialogActions>
        </Dialog>
      )}
    </Fragment>
  );
}

ElectionMenu.propTypes = {
  title: PropTypes.string.isRequired,
  electionSlug: PropTypes.string.isRequired,
  candidates: PropTypes.array.isRequired,
  partyFirst: PropTypes.bool.isRequired,
  intro: PropTypes.string,
  topicExplorerActive: PropTypes.bool,
  candidateGridActive: PropTypes.bool
};
