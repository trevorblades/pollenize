import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Avatar, Typography} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {LanguageContext} from '../utils/language';
import {differenceInYears} from 'date-fns';
import {getParty} from '../utils';
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
    bioEn,
    bioFr,
    portrait,
    birthDate,
    election,
    hometown
  } = props.data.pollenize.candidate;
  const [language] = useContext(LanguageContext);
  const party = getParty(props.data.pollenize.candidate, language);
  const isEnglish = language === 'en';
  const bio = isEnglish ? bioEn : bioFr;
  const [firstName] = name.split(' ');
  return (
    <Layout>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <HeaderBase
        link={`/elections/${election.slug}`}
        title={election.partyFirst ? party : name}
      >
        <ElectionMenu />
      </HeaderBase>
      <StyledAvatar src={portrait} />
      <Typography>{party}</Typography>
      <Typography gutterBottom variant="h4">
        {isEnglish ? 'About' : 'À propos de'} {firstName}
      </Typography>
      {birthDate && (
        <Typography gutterBottom>
          {differenceInYears(Date.now(), Number(birthDate))}{' '}
          {isEnglish ? 'years old' : 'ans'}
        </Typography>
      )}
      {hometown && (
        <Typography gutterBottom>
          {isEnglish ? 'Hometown' : 'Ville natale'}: {hometown}
        </Typography>
      )}
      <Typography>{bio}</Typography>
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
        hometown
        election {
          slug
          partyFirst
        }
      }
    }
  }
`;
