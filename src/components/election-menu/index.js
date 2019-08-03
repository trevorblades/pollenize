import LanguageMenu from './language-menu';
import PropTypes from 'prop-types';
import React, {Fragment, useContext, useMemo, useState} from 'react';
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography
} from '@material-ui/core';
import {
  FaBars,
  FaRegComments,
  FaStar,
  FaStarHalfAlt,
  FaTable
} from 'react-icons/fa';
import {Link} from 'gatsby';
import {MdTranslate} from 'react-icons/md';
import {StarsContext} from '../../utils/stars';
import {getCandidateTitles, localize} from '../../utils';
import {makeStyles} from '@material-ui/styles';

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
  const {stars, resetStars} = useContext(StarsContext);

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
      <LanguageMenu
        renderButton={openMenu => (
          <Tooltip
            title={localize(
              'Change language',
              'Changer de langue',
              props.language
            )}
          >
            <IconButton color="inherit" onClick={openMenu}>
              <MdTranslate size={24} />
            </IconButton>
          </Tooltip>
        )}
      />
      <IconButton onClick={openDrawer} color="inherit">
        <FaBars size={24} />
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
              props.language
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
                <ListItemText
                  secondary={subtitle}
                  secondaryTypographyProps={{
                    noWrap: true
                  }}
                >
                  {title}
                </ListItemText>
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
            {localize('More options', "Plus d'options", props.language)}
          </ListSubheader>
          <ListItem
            button
            disabled={!totalStarCount}
            onClick={handleResetClick}
          >
            <ListItemIcon>
              <FaStarHalfAlt size={22} style={{margin: 1}} />
            </ListItemIcon>
            <ListItemText>
              {localize(
                'Reset stars',
                'Réinitialiser les étoiles',
                props.language
              )}
            </ListItemText>
          </ListItem>
          <LanguageMenu
            renderButton={openMenu => (
              <ListItem button onClick={openMenu}>
                <ListItemIcon>
                  <MdTranslate size={24} />
                </ListItemIcon>
                <ListItemText>
                  {localize(
                    'Language: English',
                    'Langue: Français',
                    props.language
                  )}
                </ListItemText>
              </ListItem>
            )}
          />
          <ListItem button>
            <ListItemIcon>
              <FaTable size={20} style={{margin: 2}} />
            </ListItemIcon>
            <ListItemText>View table</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to={`/elections/${props.slug}/topics`}
          >
            <ListItemIcon>
              <FaRegComments size={24} />
            </ListItemIcon>
            <ListItemText>Topics-first mode</ListItemText>
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
  language: PropTypes.string.isRequired
};
