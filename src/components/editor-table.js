import ElectionTable from './election-table';
import React from 'react';
import {Typography} from '@material-ui/core';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';

const GET_ELECTION = gql`
  query GetElection($id: ID!) {
    election(id: $id) {
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

export default function EditorTable() {
  const {data, loading, error} = useQuery(GET_ELECTION, {
    variables: {
      id: 1
    }
  });

  if (loading || error) {
    return (
      <Typography color={error ? 'error' : 'textSecondary'}>
        {error ? error.message : 'Loading...'}
      </Typography>
    );
  }

  return <ElectionTable election={data.election} />;
}
