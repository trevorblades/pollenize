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
import {LanguageMenuBase} from '../language-menu';
import {Link} from 'gatsby';
import {getCandidateTitles} from '../../utils';
import {makeStyles, styled} from '@material-ui/styles';
import {useKey, useToggle} from 'react-use';
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
  const {localize} = useLanguage();
  const {stars, resetStars} = useStars();
  const {secondaryAction, starIcon} = useStyles();
  const [adminShown, toggleAdminShown] = useToggle(false);

  const totalStarCount = useMemo(
    () =>
      props.candidates.reduce((acc, candidate) => {
        const candidateStars = stars[candidate.id] || [];
        return acc + candidateStars.length;
      }, 0),
    [props.candidates, stars]
  );

  useKey('A', toggleAdminShown);

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
        <LanguageMenuBase
          renderButton={openMenu => (
            <ListItem button onClick={openMenu}>
              <ListItemText>
                {localize('Language: {lang}', 'Langue: {lang}')}
              </ListItemText>
            </ListItem>
          )}
        />
        {/* <ListItem
          button
          component={Link}
          to={`/elections/${props.electionSlug}/table`}
        >
          <ListItemText>
            {localize('View as table', 'Voir comme table')}
          </ListItemText>
        </ListItem> */}
        {props.onIntroClick && (
          <ListItem button onClick={props.onIntroClick}>
            <ListItemText>
              {localize(
                'Open intro dialog',
                "Ouvrir le dialogue d'introduction"
              )}
            </ListItemText>
          </ListItem>
        )}
      </StyledList>
      {adminShown && (
        <List>
          <ListSubheader>
            {localize('Admin options', "options d'administration")}
          </ListSubheader>
          <ListItem
            button
            component={Link}
            to={`/elections/${props.electionSlug}/___edit`}
          >
            <ListItemText>
              {localize('Edit election', "Modifier l'élection")}
            </ListItemText>
          </ListItem>
        </List>
      )}
    </Fragment>
  );
}

DrawerContent.propTypes = {
  title: PropTypes.string.isRequired,
  electionSlug: PropTypes.string.isRequired,
  candidates: PropTypes.array.isRequired,
  partyFirst: PropTypes.bool.isRequired,
  onIntroClick: PropTypes.func
};
