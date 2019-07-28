import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import snarkdown from 'snarkdown';
import {Avatar, Box, Typography} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {LanguageContext} from '../utils/language';
import {differenceInYears} from 'date-fns';
import {getParty} from '../utils';
import {graphql} from 'gatsby';
import {size} from 'polished';
import {styled, useTheme} from '@material-ui/styles';

const StyledAvatar = styled(Avatar)(({theme}) => ({
  ...size(160),
  marginBottom: theme.spacing(3)
}));

export default function CandidateTemplate(props) {
  const {
    name,
    bioEn,
    bioFr,
    color,
    portrait,
    birthDate,
    election,
    hometown
  } = props.data.pollenize.candidate;
  const {palette, breakpoints} = useTheme();
  const [language] = useContext(LanguageContext);
  const party = getParty(props.data.pollenize.candidate, language);
  const isEnglish = language === 'en';
  const bio = isEnglish ? bioEn : bioFr;
  const [firstName] = name.split(' ');
  const [title, subtitle] = election.partyFirst ? [party, name] : [name, party];
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
      <div
        style={{
          backgroundColor: color,
          color: palette.getContrastText(color)
        }}
      >
        <Box
          maxWidth={breakpoints.values.lg}
          mx="auto"
          px={8}
          py={5}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <StyledAvatar src={portrait} />
          <Typography variant="h4">{title}</Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
      </div>
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
      {bio && <Typography dangerouslySetInnerHTML={{__html: snarkdown(bio)}} />}
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
        color
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
