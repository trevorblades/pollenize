import CandidateForm from './candidate-form';
import CreateStanceForm from './create-stance-form';
import DialogButton from './dialog-button';
import ElectionTable from '../election-table';
import PropTypes from 'prop-types';
import React from 'react';
import TopicForm from './topic-form';
import UpdateStanceForm from './update-stance-form';
import {Box, CardActionArea, Chip, Typography} from '@material-ui/core';
import {GET_ELECTION} from '../../utils/queries';
import {getCandidateTitles} from '../../utils';
import {useLanguage} from '../../utils/language';
import {useQuery} from '@apollo/react-hooks';

function HeaderButton({title, children, ...props}) {
  return (
    <DialogButton
      renderButton={openDialog => (
        <Box onClick={openDialog} component={CardActionArea} p={2} {...props}>
          <Typography variant="subtitle1">{title}</Typography>
        </Box>
      )}
    >
      {children}
    </DialogButton>
  );
}

HeaderButton.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export default function EditorTable(props) {
  const {localize} = useLanguage();
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
                <Box onClick={openDialog} component={CardActionArea} p={1}>
                  <Typography
                    variant="body2"
                    color={stance.sources.length ? 'inherit' : 'textSecondary'}
                  >
                    {localize(stance.textEn, stance.textFr)}
                  </Typography>
                </Box>
              )}
            >
              {closeDialog => (
                <UpdateStanceForm
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
                  label={localize('Add stance', 'Ajouter la position')}
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
          <HeaderButton title={title} {...boxProps}>
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
        const title = localize(topic.titleEn, topic.titleFr);
        return (
          <HeaderButton title={title} {...boxProps}>
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
