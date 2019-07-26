import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
import {Link, graphql} from 'gatsby';

export default function ElectionTemplate(props) {
  const {slug, title, candidates} = props.data.pollenize.election;
  return (
    <Layout>
      <div>{title}</div>
      {candidates.map(candidate => (
        <Link key={candidate.id} to={`/elections/${slug}/${candidate.slug}`}>
          {candidate.name}
        </Link>
      ))}
    </Layout>
  );
}

ElectionTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query ElectionQuery($id: ID!) {
    pollenize {
      election(id: $id) {
        slug
        title
        candidates {
          id
          slug
          name
          partyEn
          partyFr
        }
      }
    }
  }
`;
