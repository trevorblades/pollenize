import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
import {graphql} from 'gatsby';

export default function CandidateTemplate(props) {
  const {name, partyEn} = props.data.pollenize.candidate;
  return (
    <Layout>
      <div>{name}</div>
      <div>{partyEn}</div>
    </Layout>
  );
}

CandidateTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query CandidateQuery($id: ID!) {
    pollenize {
      candidate(id: $id) {
        name
        partyEn
        partyFr
        bioEn
        bioFr
        birthDate
      }
    }
  }
`;
