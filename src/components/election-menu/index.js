import LanguageMenu from './language-menu';
import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader
} from '@material-ui/core';
import {FaBars} from 'react-icons/fa';
import {Link} from 'gatsby';
import {localize} from '../../utils';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  paper: {
    width: 350
  },
  list: {
    backgroundColor: 'inherit'
  }
});

export default function ElectionMenu(props) {
  const {paper, list} = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  function openDrawer() {
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <Fragment>
      <LanguageMenu />
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
          {props.candidates.map(candidate => (
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
                secondary={localize(
                  candidate.partyEn,
                  candidate.partyFr,
                  props.language
                )}
                secondaryTypographyProps={{
                  noWrap: true
                }}
              >
                {candidate.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Fragment>
  );
}

ElectionMenu.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  candidates: PropTypes.array.isRequired,
  language: PropTypes.string.isRequred
};
