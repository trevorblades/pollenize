import ElectionMenu from '../election-menu';
import HeaderBase from '../header-base';
import Layout from '../layout';
import PropTypes from 'prop-types';
import React, {Fragment, useContext, useMemo, useState} from 'react';
import TableOfContents, {SidebarLink} from '../table-of-contents';
import TopicSection from './topic-section';
import snarkdown from 'snarkdown';
import {Avatar, Box, Link as MuiLink, Typography} from '@material-ui/core';
import {ContentWrapper, PageAnchor, PageWrapper} from '../common';
import {Helmet} from 'react-helmet';
import {LanguageContext} from '../../utils/language';
import {StarsContext} from '../../utils/stars';
import {differenceInYears} from 'date-fns';
import {flatMap, groupBy, uniq} from 'lodash';
import {getCandidateTitles, localize} from '../../utils';
import {graphql} from 'gatsby';
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

const StyledList = styled('ol')(({theme}) => ({
  columnCount: 3,
  columnGap: theme.spacing(5),
  wordBreak: 'break-word',
  [theme.breakpoints.down('md')]: {
    columnCount: 2
  },
  [theme.breakpoints.down('sm')]: {
    columnCount: 1
  }
}));

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

  const [sourceIndex, setSourceIndex] = useState(null);
  const {palette, breakpoints} = useTheme();
  const [language] = useContext(LanguageContext);
  const stancesByTopic = useMemo(() => groupBy(stances, 'topicId'), [stances]);
  const sources = useMemo(
    () =>
      uniq(
        flatMap(stances, stance => stance.sources.map(source => source.url))
      ),
    [stances]
  );
  const {stars, toggleStar} = useContext(StarsContext);
  const candidateStars = stars[candidateId] || [];

  function handleStarClick(topicId) {
    toggleStar(candidateId, topicId);
  }

  function handleSourceClick(event) {
    setSourceIndex(event.target.textContent - 1);
  }

  const [title, subtitle] = getCandidateTitles(
    {name, partyEn, partyFr},
    election.partyFirst,
    language
  );

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
        <ElectionMenu
          title={election.title}
          slug={election.slug}
          candidates={election.candidates}
          partyFirst={election.partyFirst}
        />
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
      <PageWrapper
        sidebar={
          <TableOfContents language={language} topics={election.topics}>
            <SidebarLink href="#about">{aboutTitle}</SidebarLink>
          </TableOfContents>
        }
      >
        <PageAnchor name="about" />
        <ContentWrapper>
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
            <Typography dangerouslySetInnerHTML={{__html: snarkdown(bio)}} />
          )}
        </ContentWrapper>
        {election.topics.map(topic => (
          <TopicSection
            key={topic.id}
            topic={topic}
            stances={stancesByTopic[topic.id]}
            sources={sources}
            starred={candidateStars.includes(topic.id)}
            onStarClick={() => handleStarClick(topic.id)}
            onSourceClick={handleSourceClick}
            language={language}
          />
        ))}
      </PageWrapper>
      <PageAnchor name="sources" />
      <Box bgcolor="grey.200" component="footer">
        <Box
          maxWidth={breakpoints.values.lg}
          mx="auto"
          px={{
            xs: 5,
            lg: 8
          }}
          py={{
            xs: 7,
            lg: 10
          }}
        >
          <Typography gutterBottom variant="h4" color="textSecondary">
            Sources
          </Typography>
          <StyledList>
            {sources.map((source, index) => (
              <Fragment key={source}>
                <PageAnchor name={`source-${index + 1}`} />
                <Typography
                  gutterBottom
                  color={sourceIndex === index ? 'primary' : 'textSecondary'}
                  component="li"
                  variant="body2"
                >
                  <MuiLink
                    color="inherit"
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source}
                  </MuiLink>
                </Typography>
              </Fragment>
            ))}
          </StyledList>
        </Box>
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
          title
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
          candidates {
            id
            name
            slug
            partyEn
            partyFr
            portrait
          }
        }
      }
    }
  }
`;
