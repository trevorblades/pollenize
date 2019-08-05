import LanguageMenu from './language-menu';
import PropTypes from 'prop-types';
import React, {Fragment, useMemo, useState} from 'react';
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography
} from '@material-ui/core';
import {FaRegComments, FaStar} from 'react-icons/fa';
import {FiMenu} from 'react-icons/fi';
import {Link} from 'gatsby';
import {MdTranslate} from 'react-icons/md';
import {getCandidateTitles} from '../../utils';
import {makeStyles} from '@material-ui/styles';
import {useLanguage} from '../../utils/language';
import {useStars} from '../../utils/stars';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 350
  },
  list: {
    backgroundColor: 'inherit'
  },
  secondaryAction: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary
  },
  starIcon: {
    marginBottom: 2,
    marginLeft: 4
  }
}));

export default function ElectionMenu(props) {
  const {paper, list, secondaryAction, starIcon} = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {localize} = useLanguage();
  const {stars, resetStars} = useStars();

  const totalStarCount = useMemo(
    () =>
      props.candidates.reduce((acc, candidate) => {
        const candidateStars = stars[candidate.id] || [];
        return acc + candidateStars.length;
      }, 0),
    [props.candidates, stars]
  );

  function openDrawer() {
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  function handleResetClick() {
    resetStars(props.candidates);
  }

  return (
    <Fragment>
      <Tooltip title={localize('Topic explorer', 'Explorateur de sujets')}>
        <IconButton
          component={Link}
          to={`/elections/${props.slug}/topics`}
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
        <List className={list}>
          <ListSubheader>{props.title}</ListSubheader>
          {props.candidates.map(candidate => {
            const candidateStars = stars[candidate.id] || [];
            const [title, subtitle] = getCandidateTitles(
              candidate,
              props.partyFirst,
              localize
            );

            return (
              <ListItem
                button
                component={Link}
                to={`/elections/${props.slug}/${candidate.slug}`}
                key={candidate.id}
              >
                <ListItemAvatar>
                  <Avatar src={candidate.portrait} />
                </ListItemAvatar>
                <ListItemText secondary={subtitle}>{title}</ListItemText>
                <ListItemSecondaryAction className={secondaryAction}>
                  <Typography variant="body2">
                    {candidateStars.length}
                  </Typography>
                  <FaStar size={14} className={starIcon} />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <List className={list}>
          <ListSubheader>
            {localize('More options', "Plus d'options")}
          </ListSubheader>
          <ListItem
            button
            disabled={!totalStarCount}
            onClick={handleResetClick}
          >
            <ListItemText>
              {localize('Reset stars', 'Réinitialiser les étoiles')}
            </ListItemText>
          </ListItem>
          <LanguageMenu
            renderButton={openMenu => (
              <ListItem button onClick={openMenu}>
                <ListItemText>
                  {localize('Language: English', 'Langue: Français')}
                </ListItemText>
              </ListItem>
            )}
          />
          <ListItem button>
            <ListItemText>View as table</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </Fragment>
  );
}

ElectionMenu.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  candidates: PropTypes.array.isRequired,
  partyFirst: PropTypes.bool.isRequired,
  topicExplorerActive: PropTypes.bool
};
