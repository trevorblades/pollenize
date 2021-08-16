import CandidateForm from './candidate-form';
import CreateStanceForm from './create-stance-form';
import DialogButton from './dialog-button';
import ElectionTable from './election-table';
import HeaderButton from './header-button';
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
import {useQuery} from '@apollo/client';

const useStyles = makeStyles(theme => ({
  stanceButton: {
    padding: theme.spacing(1)
  }
}));

export default function EditorTable(props) {
  const {stanceButton} = useStyles();
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
                    {stance.messages[0].text}
                  </Typography>
                </CardActionArea>
              )}
            >
              {closeDialog => (
                <UpdateStanceForm
                  election={data.election}
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
                <Chip onClick={openDialog} label="Add stance" size="small" />
              )}
            >
              {closeDialog => (
                <CreateStanceForm
                  election={data.election}
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
        const {name, parties} = candidate;
        const [title] = getCandidateTitles(
          {name, party: parties.length ? parties[0].text : null},
          data.election.partyFirst
        );
        return (
          <HeaderButton title={title} {...boxProps}>
            {closeDialog => (
              <CandidateForm
                title={title}
                candidate={candidate}
                onClose={closeDialog}
                languages={data.election.languages}
              />
            )}
          </HeaderButton>
        );
      }}
      renderTopic={({topic, boxProps}) => {
        const title = topic.titles.length ? topic.titles[0].text : topic.slug;
        return (
          <HeaderButton title={title} {...boxProps}>
            {closeDialog => (
              <TopicForm
                title={title}
                topic={topic}
                onClose={closeDialog}
                languages={data.election.languages}
              />
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
