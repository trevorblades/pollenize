import ElectionMenu from '../election-menu';
import HeaderBase, {HEADER_HEIGHT} from '../header-base';
import Layout from '../layout';
import PropTypes from 'prop-types';
import React, {useContext, useMemo} from 'react';
import TopicSection from './topic-section';
import snarkdown from 'snarkdown';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import {
  Avatar,
  Box,
  Grid,
  Link as MuiLink,
  Typography
} from '@material-ui/core';
import {ContentBox, PageAnchor} from '../common';
import {Helmet} from 'react-helmet';
import {LanguageContext} from '../../utils/language';
import {differenceInYears} from 'date-fns';
import {getCandidateTitles, localize} from '../../utils';
import {graphql} from 'gatsby';
import {groupBy} from 'lodash';
import {size} from 'polished';
import {styled, useTheme} from '@material-ui/styles';

const StyledAvatar = styled(Avatar)(({theme}) => ({
  ...size(160),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    ...size(120),
    marginBottom: theme.spacing(2)
  }
}));

function SidebarLink(props) {
  return (
    <Typography paragraph variant="body2">
      <MuiLink {...props} color="inherit" />
    </Typography>
  );
}

export default function CandidateTemplate(props) {
  const {
    id: candidateId,
    name,
    partyEn,
    partyFr,
    bioEn,
    bioFr,
    color,
    portrait,
    birthDate,
    election,
    hometown,
    stances
  } = props.data.pollenize.candidate;

  const {palette, breakpoints, spacing} = useTheme();
  const [language] = useContext(LanguageContext);
  const stancesByTopic = useMemo(() => groupBy(stances, 'topicId'), [stances]);
  const [stars, setStars] = useLocalStorage('stars', {});
  const candidateStars = stars[candidateId] || [];

  function handleStarClick(topicId) {
    setStars(prevStars => {
      const prevCandidateStars = prevStars[candidateId];
      return {
        ...prevStars,
        [candidateId]: prevCandidateStars
          ? prevCandidateStars.includes(topicId)
            ? prevCandidateStars.filter(id => id !== topicId)
            : [...prevCandidateStars, topicId]
          : [topicId]
      };
    });
  }

  const [title, subtitle] = getCandidateTitles(
    {name, partyEn, partyFr},
    election.partyFirst,
    language
  );

  const maxWidth = breakpoints.values.lg;
  const bio = localize(bioEn, bioFr, language);
  const [firstName] = name.split(' ');
  const aboutTitle = `${localize(
    'About',
    'À propos de',
    language
  )} ${firstName}`;

  return (
    <Layout>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <HeaderBase link={`/elections/${election.slug}`} title={title}>
        <ElectionMenu />
      </HeaderBase>
      <div
        style={{
          backgroundColor: color,
          color: palette.getContrastText(color)
        }}
      >
        <Box
          p={{
            xs: 5,
            md: 7
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <StyledAvatar src={portrait} />
          <Typography variant="h3" style={{marginBottom: 8}}>
            {title}
          </Typography>
          {subtitle && <Typography variant="h6">{subtitle}</Typography>}
        </Box>
      </div>
      <Box
        maxWidth={{
          md: maxWidth - spacing(6),
          lg: maxWidth
        }}
        mx="auto"
      >
        <Grid container>
          <Grid item xs={12} md={4} lg={3}>
            <Box
              component="aside"
              position="sticky"
              display={{
                xs: 'none',
                md: 'block'
              }}
              mt={{
                md: 3,
                lg: 5
              }}
              py={2}
              pl={{
                md: 5,
                lg: 8
              }}
              pr={3}
              top={HEADER_HEIGHT}
            >
              <Typography paragraph variant="overline" noWrap>
                Table of contents
              </Typography>
              <SidebarLink href="#about">{aboutTitle}</SidebarLink>
              {election.topics.map(topic => (
                <SidebarLink key={topic.id} href={`#${topic.slug}`}>
                  {localize(topic.titleEn, topic.titleFr, language)}
                </SidebarLink>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <PageAnchor name="about" />
            <ContentBox>
              <Typography gutterBottom variant="h4">
                {aboutTitle}
              </Typography>
              {birthDate && (
                <Typography gutterBottom>
                  {differenceInYears(Date.now(), Number(birthDate))}{' '}
                  {localize('years old', 'ans', language)}
                </Typography>
              )}
              {hometown && (
                <Typography gutterBottom>
                  {localize('Hometown', 'Ville natale', language)}: {hometown}
                </Typography>
              )}
              {bio && (
                <Typography
                  dangerouslySetInnerHTML={{__html: snarkdown(bio)}}
                />
              )}
            </ContentBox>
            {election.topics.map(topic => (
              <TopicSection
                key={topic.id}
                topic={topic}
                stances={stancesByTopic[topic.id]}
                starred={candidateStars.includes(topic.id)}
                onStarClick={() => handleStarClick(topic.id)}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
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
        id
        name
        portrait
        partyEn
        partyFr
        bioEn
        bioFr
        color
        birthDate
        hometown
        stances {
          id
          textEn
          textFr
          topicId
          sources {
            id
            url
          }
        }
        election {
          slug
          partyFirst
          topics {
            id
            slug
            image
            titleEn
            titleFr
            descriptionEn
            descriptionFr
          }
        }
      }
    }
  }
`;
