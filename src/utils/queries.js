import gql from 'graphql-tag';

const SOURCE_FRAGMENT = gql`
  fragment SourceFragment on Source {
    id
    url
  }
`;

export const STANCE_FRAGMENT = gql`
  fragment StanceFragment on Stance {
    id
    textEn
    textFr
    topicId
    sources {
      ...SourceFragment
    }
  }
  ${SOURCE_FRAGMENT}
`;

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
    stances {
      ...StanceFragment
    }
  }
  ${STANCE_FRAGMENT}
`;

export const TOPIC_FRAGMENT = gql`
  fragment TopicFragment on Topic {
    id
    titleEn
    titleFr
    descriptionEn
    descriptionFr
    image
    order
  }
`;

const ELECTION_FRAGMENT = gql`
  fragment ElectionFragment on Election {
    id
    partyFirst
    candidates {
      ...CandidateFragment
    }
    topics {
      ...TopicFragment
    }
  }
  ${CANDIDATE_FRAGMENT}
  ${TOPIC_FRAGMENT}
`;

export const GET_ELECTION = gql`
  query GetElection($id: ID!) {
    election(id: $id) {
      ...ElectionFragment
    }
  }
  ${ELECTION_FRAGMENT}
`;
