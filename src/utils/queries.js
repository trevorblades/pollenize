import gql from 'graphql-tag';

export const CANDIDATE_FRAGMENT = gql`
  fragment CandidateFragment on Candidate {
    id
    name
    color
    portrait
    partyEn
    partyFr
    hometown
    birthDate
    bioEn
    bioFr
    active
  }
`;
