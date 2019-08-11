import PropTypes from 'prop-types';
import React from 'react';
import StanceForm from './stance-form';
import gql from 'graphql-tag';
import {STANCE_FRAGMENT} from '../../utils/queries';
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

export default function UpdateStanceForm(props) {
  const [updateStance, {loading, error}] = useMutation(UPDATE_STANCE, {
    onCompleted: props.onClose,
    variables: {
      id: props.stance.id
    }
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
    />
  );
}

UpdateStanceForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  stance: PropTypes.object.isRequired,
  candidate: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired
};
