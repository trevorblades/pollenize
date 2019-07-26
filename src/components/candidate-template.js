import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
import {Avatar} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {graphql} from 'gatsby';
import {size} from 'polished';
import {styled} from '@material-ui/styles';

const StyledAvatar = styled(Avatar)(({theme}) => ({
  ...size(160),
  marginRight: theme.spacing(2)
}));

export default function CandidateTemplate(props) {
  const {
    name,
    partyEn,
    bioEn,
    portrait,
    election
  } = props.data.pollenize.candidate;
  return (
    <Layout>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <HeaderBase link={`/elections/${election.slug}`} title={name}>
        <ElectionMenu />
      </HeaderBase>
      <StyledAvatar src={portrait} />
      <div>{partyEn}</div>
      <div>{bioEn}</div>
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
        portrait
        partyEn
        partyFr
        bioEn
        bioFr
        birthDate
        election {
          slug
        }
      }
    }
  }
`;
