import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
import {graphql} from 'gatsby';

export default function TableTemplate(props) {
  const {
    slug,
    title,
    candidates,
    partyFirst,
    introEn,
    introFr
  } = props.data.pollenize.election;
  return (
    <Layout>
      <HeaderBase link={`/elections/${slug}`} title={title}>
        <ElectionMenu
          title={title}
          electionSlug={slug}
          candidates={candidates}
          partyFirst={partyFirst}
          introEn={introEn}
          introFr={introFr}
        />
      </HeaderBase>
      Table goes here :P
    </Layout>
  );
}

TableTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query TableQuery($id: ID!) {
    pollenize {
      election(id: $id) {
        slug
        title
        partyFirst
        introEn
        introFr
        candidates(active: true) {
          id
          slug
          name
          partyEn
          partyFr
          portrait
        }
      }
    }
  }
`;
