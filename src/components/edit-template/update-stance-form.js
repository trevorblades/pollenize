import DeleteButton from './delete-button';
import PropTypes from 'prop-types';
import React from 'react';
import StanceForm from './stance-form';
import gql from 'graphql-tag';
import {GET_ELECTION, STANCE_FRAGMENT} from '../../utils/queries';
import {useMutation} from '@apollo/react-hooks';

const UPDATE_STANCE = gql`
  mutation UpdateStance(
    $id: ID!
    $textEn: String
    $textFr: String
    $sources: [SourceInput]
  ) {
    updateStance(id: $id, textEn: $textEn, textFr: $textFr, sources: $sources) {
      ...StanceFragment
    }
  }
  ${STANCE_FRAGMENT}
`;

const DELETE_STANCE = gql`
  mutation DeleteStance($id: ID!) {
    deleteStance(id: $id)
  }
`;

export default function UpdateStanceForm(props) {
  const variables = {id: props.stance.id};
  const [updateStance, {loading, error}] = useMutation(UPDATE_STANCE, {
    onCompleted: props.onClose,
    variables
  });

  return (
    <StanceForm
      onClose={props.onClose}
      title="Editing stance"
      buttonText="Save changes"
      stance={props.stance}
      candidate={props.candidate}
      topic={props.topic}
      mutation={updateStance}
      loading={loading}
      error={error}
    >
      <DeleteButton
        noun="stance"
        mutation={DELETE_STANCE}
        mutationOptions={{
          variables,
          update(cache, {data}) {
            const {election} = cache.readQuery({
              query: GET_ELECTION,
              variables: {
                id: props.electionId
              }
            });

            cache.writeQuery({
              query: GET_ELECTION,
              data: {
                election: {
                  ...election,
                  candidates: election.candidates.map(candidate =>
                    candidate.id === props.candidate.id
                      ? {
                          ...candidate,
                          stances: candidate.stances.filter(
                            stance => stance.id !== data.deleteStance
                          )
                        }
                      : candidate
                  )
                }
              }
            });
          }
        }}
      />
    </StanceForm>
  );
}

UpdateStanceForm.propTypes = {
  electionId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  stance: PropTypes.object.isRequired,
  candidate: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired
};
