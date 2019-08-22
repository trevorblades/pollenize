import DrawerContent from './drawer-content';
import LanguageMenu, {getPathForLanguage} from './language-menu';
import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import {CardActionArea} from 'gatsby-theme-material-ui';
import {FaRegComments, FaThLarge} from 'react-icons/fa';
import {FiInfo, FiMenu} from 'react-icons/fi';
import {Link} from 'gatsby';
import {MdCheck} from 'react-icons/md';
import {upperFirst} from 'lodash';
import {useLanguage} from '../../utils/language';
import {useLocalStorage} from 'react-use';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 350,
    [theme.breakpoints.only('xs')]: {
      width: 300
    }
  },
  languageButton: {
    padding: theme.spacing(2),
    border: '1px solid currentColor',
    borderRadius: theme.shape.borderRadius
  }
}));

export default function ElectionMenu(props) {
  const {paper, languageButton} = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [introState, setIntroState] = useLocalStorage('intro', {});
  const [dialogOpen, setDialogOpen] = useState(!introState[props.electionSlug]);
  const {localize} = useLanguage();

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

  const electionPath = `/${props.lang}/elections/${props.electionSlug}`;
  const languageMenuProps = {
    lang: props.lang,
    languages: props.languages,
    path: props.path
  };

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
          color={props.active === 'grid' ? 'primary' : 'inherit'}
        >
          <FaThLarge style={{margin: 2}} size={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title={localize('Topic explorer', 'Explorateur de sujets')}>
        <IconButton
          component={Link}
          to={`${electionPath}/topics`}
          color={props.active === 'topics' ? 'primary' : 'inherit'}
        >
          <FaRegComments />
        </IconButton>
      </Tooltip>
      <Hidden only="xs" implementation="css">
        <LanguageMenu {...languageMenuProps} />
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
          electionPath={electionPath}
          title={props.title}
          partyFirst={props.partyFirst}
          onIntroClick={props.intro && openDialog}
          languageMenuProps={languageMenuProps}
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
            <Typography paragraph>{props.intro}</Typography>
            <Typography
              paragraph
              display="block"
              color="textSecondary"
              variant="body2"
            >
              {localize(
                'Select your preferred language',
                'Sélectionnez votre langue préférée'
              )}
              :
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(props.languages).map(([code, name]) => (
                <Grid item xs={6} key={code}>
                  <Box color={code === props.lang ? 'primary.main' : 'inherit'}>
                    <CardActionArea
                      className={languageButton}
                      to={getPathForLanguage(props.path, code)}
                    >
                      <Typography variant="h5">{upperFirst(code)}</Typography>
                      <Typography>{name}</Typography>
                    </CardActionArea>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>
              <MdCheck size={20} style={{marginRight: 8}} />
              Done
            </Button>
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
  lang: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  languages: PropTypes.object.isRequired,
  intro: PropTypes.string,
  active: PropTypes.string
};
