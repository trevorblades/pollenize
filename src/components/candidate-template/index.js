import ElectionMenu from '../election-menu';
import HeaderBase from '../header-base';
import Layout from '../layout';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import Sources, {useSources} from '../sources';
import TableOfContents, {SidebarLink} from '../table-of-contents';
import TopicSection from './topic-section';
import snarkdown from 'snarkdown';
import {Avatar, Typography} from '@material-ui/core';
import {ContentWrapper, PageAnchor, PageHeader, PageWrapper} from '../common';
import {Helmet} from 'react-helmet';
import {differenceInYears} from 'date-fns';
import {getCandidateTitles} from '../../utils';
import {graphql} from 'gatsby';
import {groupBy} from 'lodash';
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

  const {palette} = useTheme();
  const {localize} = useLanguage();
  const stancesByTopic = useMemo(() => groupBy(stances, 'topicId'), [stances]);
  const {sources, activeSource, handleSourceClick} = useSources(stances);
  const {stars, toggleStar} = useStars();
  const candidateStars = stars[candidateId] || [];

  function handleStarClick(topicId) {
    toggleStar(candidateId, topicId);
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
          intro={localize(election.introEn, election.introFr)}
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
      <Sources sources={sources} activeIndex={activeSource} />
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
          introEn
          introFr
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
