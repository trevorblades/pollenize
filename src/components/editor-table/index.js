import CandidateForm from './candidate-form';
import CreateStanceForm from './create-stance-form';
import DialogButton from './dialog-button';
import ElectionTable from '../election-table';
import PropTypes from 'prop-types';
import React from 'react';
import TopicForm from './topic-form';
import UpdateStanceForm from './update-stance-form';
import {
  Box,
  CardActionArea,
  Chip,
  Typography,
  makeStyles
} from '@material-ui/core';
import {GET_ELECTION} from '../../utils/queries';
import {getCandidateTitles} from '../../utils';
import {useLanguage} from '../../utils/language';
import {useQuery} from '@apollo/react-hooks';

function HeaderButton({title, children, className, ...props}) {
  return (
    <DialogButton
      renderButton={openDialog => (
        <Box {...props}>
          <CardActionArea onClick={openDialog} className={className}>
            <Typography variant="subtitle1">{title}</Typography>
          </CardActionArea>
        </Box>
      )}
    >
      {children}
    </DialogButton>
  );
}

HeaderButton.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

const useStyles = makeStyles(theme => ({
  headerButton: {
    height: '100%',
    padding: theme.spacing(2)
  },
  stanceButton: {
    padding: theme.spacing(1)
  }
}));

export default function EditorTable(props) {
  const {localize} = useLanguage();
  const {headerButton, stanceButton} = useStyles();
  const {data, loading, error} = useQuery(GET_ELECTION, {
    variables: {
      id: props.id
    }
  });

  if (loading || error) {
    return (
      <Typography color={error ? 'error' : 'textSecondary'}>
        {error ? error.message : 'Loading...'}
      </Typography>
    );
  }

  return (
    <ElectionTable
      election={data.election}
      renderStances={({stances, candidate, topic, boxProps}) => (
        <Box p={1} {...boxProps}>
          {stances.map(stance => (
            <DialogButton
              key={stance.id}
              renderButton={openDialog => (
                <CardActionArea onClick={openDialog} className={stanceButton}>
                  <Typography
                    variant="body2"
                    color={stance.sources.length ? 'inherit' : 'textSecondary'}
                  >
                    {/* TODO: localize this */}
                    {stance.textEn}
                  </Typography>
                </CardActionArea>
              )}
            >
              {closeDialog => (
                <UpdateStanceForm
                  electionId={data.election.id}
                  stance={stance}
                  candidate={candidate}
                  topic={topic}
                  onClose={closeDialog}
                />
              )}
            </DialogButton>
          ))}
          <Box my={1}>
            <DialogButton
              renderButton={openDialog => (
                <Chip
                  onClick={openDialog}
                  label={localize('Add stance')}
                  size="small"
                />
              )}
            >
              {closeDialog => (
                <CreateStanceForm
                  electionId={data.election.id}
                  candidate={candidate}
                  topic={topic}
                  onClose={closeDialog}
                />
              )}
            </DialogButton>
          </Box>
        </Box>
      )}
      renderCandidate={({candidate, boxProps}) => {
        const [title] = getCandidateTitles(
          candidate,
          data.election.partyFirst,
          localize
        );
        return (
          <HeaderButton title={title} className={headerButton} {...boxProps}>
            {closeDialog => (
              <CandidateForm
                title={title}
                candidate={candidate}
                onClose={closeDialog}
              />
            )}
          </HeaderButton>
        );
      }}
      renderTopic={({topic, boxProps}) => {
        // TODO: localize this
        const title = topic.titleEn;
        return (
          <HeaderButton title={title} className={headerButton} {...boxProps}>
            {closeDialog => (
              <TopicForm title={title} topic={topic} onClose={closeDialog} />
            )}
          </HeaderButton>
        );
      }}
    />
  );
}

EditorTable.propTypes = {
  id: PropTypes.string.isRequired
};
