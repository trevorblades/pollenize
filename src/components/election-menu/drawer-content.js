import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
  makeStyles,
  styled
} from '@material-ui/core';
import {FaStar} from 'react-icons/fa';
import {LanguageMenuBase} from '../language-menu';
import {Link} from 'gatsby';
import {getCandidateTitles} from '../../utils';
import {useKey, useToggle} from 'react-use';
import {useLanguage} from '../../utils/language';

const StyledList = styled(List)({
  backgroundColor: 'inherit'
});

const useStyles = makeStyles(theme => ({
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

export default function DrawerContent(props) {
  const {localize, languages} = useLanguage();
  const {secondaryAction, starIcon} = useStyles();
  const [adminShown, toggleAdminShown] = useToggle(false);

  useKey('A', toggleAdminShown);

  function handleResetClick() {
    props.resetStars(props.candidates);
  }

  return (
    <Fragment>
      <StyledList>
        <ListSubheader>{props.title}</ListSubheader>
        {props.candidates.map(candidate => {
          const candidateStars = props.stars[candidate.id] || [];
          const [title, subtitle] = getCandidateTitles(
            candidate,
            props.partyFirst
          );

          return (
            <ListItem
              button
              component={Link}
              to={`${props.electionPath}/${candidate.slug}`}
              key={candidate.id}
            >
              <ListItemAvatar>
                <Avatar src={candidate.portrait} />
              </ListItemAvatar>
              <ListItemText secondary={subtitle}>{title}</ListItemText>
              <ListItemSecondaryAction className={secondaryAction}>
                <Typography variant="body2">{candidateStars.length}</Typography>
                <FaStar size={14} className={starIcon} />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </StyledList>
      <StyledList>
        <ListSubheader>{localize('More options')}</ListSubheader>
        <ListItem
          button
          disabled={!props.totalStarCount}
          onClick={handleResetClick}
        >
          <ListItemText>{localize('Reset stars')}</ListItemText>
        </ListItem>
        {languages.length > 1 && (
          <LanguageMenuBase
            renderButton={openMenu => (
              <ListItem button onClick={openMenu}>
                <ListItemText>{localize('Language: English')}</ListItemText>
              </ListItem>
            )}
          />
        )}
        {props.onIntroClick && (
          <ListItem button onClick={props.onIntroClick}>
            <ListItemText>{localize('Open intro dialog')}</ListItemText>
          </ListItem>
        )}
      </StyledList>
      {adminShown && (
        <List>
          <ListSubheader>{localize('Admin options')}</ListSubheader>
          <ListItem
            button
            component={Link}
            to={`/_/edit?id=${props.electionId}`}
          >
            <ListItemText>{localize('Edit election')}</ListItemText>
          </ListItem>
        </List>
      )}
    </Fragment>
  );
}

DrawerContent.propTypes = {
  title: PropTypes.string.isRequired,
  electionId: PropTypes.string.isRequired,
  electionPath: PropTypes.string.isRequired,
  candidates: PropTypes.array.isRequired,
  totalStarCount: PropTypes.number.isRequired,
  stars: PropTypes.object.isRequired,
  resetStars: PropTypes.func.isRequired,
  partyFirst: PropTypes.bool.isRequired,
  onIntroClick: PropTypes.func
};
