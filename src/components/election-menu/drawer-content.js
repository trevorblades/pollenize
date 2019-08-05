import LanguageMenu from './language-menu';
import PropTypes from 'prop-types';
import React, {Fragment, useMemo} from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core';
import {FaStar} from 'react-icons/fa';
import {Link} from 'gatsby';
import {getCandidateTitles} from '../../utils';
import {makeStyles, styled} from '@material-ui/styles';
import {useLanguage} from '../../utils/language';
import {useStars} from '../../utils/stars';

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
  const {secondaryAction, starIcon} = useStyles();
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

  function handleResetClick() {
    resetStars(props.candidates);
  }

  return (
    <Fragment>
      <StyledList>
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
              to={`/elections/${props.electionSlug}/${candidate.slug}`}
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
        <ListSubheader>
          {localize('More options', "Plus d'options")}
        </ListSubheader>
        <ListItem button disabled={!totalStarCount} onClick={handleResetClick}>
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
      </StyledList>
    </Fragment>
  );
}

DrawerContent.propTypes = {
  title: PropTypes.string.isRequired,
  electionSlug: PropTypes.string.isRequired,
  candidates: PropTypes.array.isRequired,
  partyFirst: PropTypes.bool.isRequired
};