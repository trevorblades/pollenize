import CandidateForm from './candidate-form';
import ElectionTable from '../election-table';
import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import TopicForm from './topic-form';
import {
  Box,
  Button,
  CardActionArea,
  Dialog,
  Typography
} from '@material-ui/core';
import {CANDIDATE_FRAGMENT} from '../../utils/queries';
import {FaPlus} from 'react-icons/fa';
import {getCandidateTitles} from '../../utils';
import {gql} from 'apollo-boost';
import {useLanguage} from '../../utils/language';
import {useQuery} from '@apollo/react-hooks';

const GET_ELECTION = gql`
  query GetElection($id: ID!) {
    election(id: $id) {
      partyFirst
      candidates {
        ...CandidateFragment
        stances {
          id
          textEn
          textFr
          topicId
          sources {
            id
            url
          }
        }
      }
      topics {
        id
        titleEn
        titleFr
        descriptionEn
        descriptionFr
      }
    }
  }
  ${CANDIDATE_FRAGMENT}
`;

function HeaderButton({title, children, ...props}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  function openDialog() {
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  return (
    <Fragment>
      <Box onClick={openDialog} component={CardActionArea} p={2} {...props}>
        <Typography variant="subtitle1">{title}</Typography>
      </Box>
      <Dialog fullWidth scroll="body" open={dialogOpen} onClose={closeDialog}>
        {children(closeDialog)}
      </Dialog>
    </Fragment>
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
      renderStances={(stances, boxProps) => (
        <Box p={1} {...boxProps}>
          {stances.map(stance => (
            <Box component={CardActionArea} key={stance.id} p={1}>
              <Typography
                variant="body2"
                color={stance.sources.length ? 'inherit' : 'textSecondary'}
              >
                {localize(stance.textEn, stance.textFr)}
              </Typography>
            </Box>
          ))}
          <Box my={1}>
            <Button>
              <FaPlus style={{marginRight: 8}} />
              {localize('Stance', 'Position')}
            </Button>
          </Box>
        </Box>
      )}
      renderCandidate={(candidate, boxProps) => {
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
      renderTopic={(topic, boxProps) => {
        const title = localize(topic.titleEn, topic.titleFr);
        return (
          <HeaderButton title={title} {...boxProps}>
            {closeDialog => <TopicForm title={title} onClose={closeDialog} />}
          </HeaderButton>
        );
      }}
    />
  );
}

EditorTable.propTypes = {
  id: PropTypes.string.isRequired
};
