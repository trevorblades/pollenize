import gql from 'graphql-tag';

const MESSAGE_FRAGMENT = gql`
  fragment MessageFragment on Message {
    id
    text
    languageId
  }
`;

export const STANCE_FRAGMENT = gql`
  fragment StanceFragment on Stance {
    id
    topicId
    messages {
      ...MessageFragment
    }
    sources {
      id
      url
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export const CANDIDATE_FRAGMENT = gql`
  fragment CandidateFragment on Candidate {
    id
    name
    color
    portrait
    parties {
      ...MessageFragment
    }
    hometown
    birthDate
    bios {
      ...MessageFragment
    }
    active
    stances {
      ...StanceFragment
    }
  }
  ${STANCE_FRAGMENT}
  ${MESSAGE_FRAGMENT}
`;

export const TOPIC_FRAGMENT = gql`
  fragment TopicFragment on Topic {
    id
    slug
    titles {
      ...MessageFragment
    }
    descriptions {
      ...MessageFragment
    }
    image
    order
  }
  ${MESSAGE_FRAGMENT}
`;

export const KEYWORD_FRAGMENT = gql`
  fragment KeywordFragment on Keyword {
    id
    words {
      ...MessageFragment
    }
    definitions {
      ...MessageFragment
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export const GET_ELECTION = gql`
  query GetElection($id: ID!) {
    election(id: $id) {
      id
      partyFirst
      languages {
        id
        code
        name
      }
      candidates {
        ...CandidateFragment
      }
      topics {
        ...TopicFragment
      }
      keywords {
        ...KeywordFragment
      }
    }
  }
  ${CANDIDATE_FRAGMENT}
  ${TOPIC_FRAGMENT}
  ${KEYWORD_FRAGMENT}
`;
