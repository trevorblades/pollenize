import ElectionTable from '../election-table';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Box, CardActionArea, Typography} from '@material-ui/core';
import {getCandidateTitles} from '../../utils';
import {gql} from 'apollo-boost';
import {useLanguage} from '../../utils/language';
import {useQuery} from '@apollo/react-hooks';

const GET_ELECTION = gql`
  query GetElection($id: ID!) {
    election(id: $id) {
      partyFirst
      candidates {
        name
        hometown
        birthDate
        partyEn
        partyFr
        bioEn
        bioFr
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
`;

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
            <CardActionArea key={stance.id}>
              <Box p={1}>
                <Typography variant="body2">
                  {localize(stance.textEn, stance.textFr)}
                  {!stance.sources.length && (
                    <Fragment>
                      {' '}
                      <Box component="span" color="error.main">
                        [needs source]
                      </Box>
                    </Fragment>
                  )}
                </Typography>
              </Box>
            </CardActionArea>
          ))}
        </Box>
      )}
      renderCandidate={(candidate, boxProps) => {
        const [title] = getCandidateTitles(
          candidate,
          data.election.partyFirst,
          localize
        );
        return (
          <Box component={CardActionArea} p={2} {...boxProps}>
            <Typography variant="subtitle1">{title}</Typography>
          </Box>
        );
      }}
      renderTopic={(topic, boxProps) => (
        <Box component={CardActionArea} p={2} {...boxProps}>
          <Typography variant="subtitle1">
            {localize(topic.titleEn, topic.titleFr)}
          </Typography>
        </Box>
      )}
    />
  );
}

EditorTable.propTypes = {
  id: PropTypes.string.isRequired
};
