import ElectionMenu from '../election-menu';
import HeaderBase from '../header-base';
import Layout from '../layout';
import PropTypes from 'prop-types';
import React, {Fragment, useMemo, useState} from 'react';
import TableOfContents, {SidebarLink} from '../table-of-contents';
import TopicSection from './topic-section';
import snarkdown from 'snarkdown';
import {Avatar, Box, Link as MuiLink, Typography} from '@material-ui/core';
import {ContentWrapper, PageAnchor, PageHeader, PageWrapper} from '../common';
import {Helmet} from 'react-helmet';
import {differenceInYears} from 'date-fns';
import {flatMap, groupBy, uniq} from 'lodash';
import {getCandidateTitles} from '../../utils';
import {graphql} from 'gatsby';
import {size} from 'polished';
import {styled, useTheme} from '@material-ui/styles';
import {useLanguage} from '../../utils/language';
import {useStars} from '../../utils/stars';

const StyledAvatar = styled(Avatar)(({theme}) => ({
  ...size(160),
  margin: '0 auto',
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
  const {localize} = useLanguage();
  const stancesByTopic = useMemo(() => groupBy(stances, 'topicId'), [stances]);
  const sources = useMemo(
    () =>
      uniq(
        flatMap(stances, stance => stance.sources.map(source => source.url))
      ),
    [stances]
  );
  const {stars, toggleStar} = useStars();
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
    localize
  );

  const bio = localize(bioEn, bioFr);
  const [firstName] = name.split(' ');
  const aboutTitle = `${localize('About', 'À propos de')} ${firstName}`;

  return (
    <Layout>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <HeaderBase link={`/elections/${election.slug}`} title={title}>
        <ElectionMenu
          title={election.title}
          electionSlug={election.slug}
          candidates={election.candidates}
          partyFirst={election.partyFirst}
        />
      </HeaderBase>
      <PageHeader
        title={title}
        subtitle={subtitle}
        bgcolor={color}
        color={palette.getContrastText(color)}
      >
        <StyledAvatar src={portrait} />
      </PageHeader>
      <PageWrapper
        sidebar={
          <TableOfContents topics={election.topics}>
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
              {localize('years old', 'ans')}
            </Typography>
          )}
          {hometown && (
            <Typography gutterBottom>
              {localize('Hometown', 'Ville natale')}: {hometown}
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
            electionSlug={election.slug}
            stances={stancesByTopic[topic.id]}
            sources={sources}
            starred={candidateStars.includes(topic.id)}
            onStarClick={() => handleStarClick(topic.id)}
            onSourceClick={handleSourceClick}
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
