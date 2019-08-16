import ElectionMenu from '../election-menu';
import HeaderBase from '../header-base';
import Layout from '../layout';
import PropTypes from 'prop-types';
import React, {useMemo, useRef, useState} from 'react';
import Sources, {useSources} from '../sources';
import TableOfContents, {SidebarLink} from '../table-of-contents';
import TopicSection from './topic-section';
import clipboard from 'clipboard-polyfill';
import snarkdown from 'snarkdown';
import {Avatar, Snackbar, Typography} from '@material-ui/core';
import {ContentWrapper, PageAnchor, PageHeader, PageWrapper} from '../common';
import {Helmet} from 'react-helmet';
import {differenceInYears} from 'date-fns';
import {getCandidateTitles, useCurrentAnchor} from '../../utils';
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

  const queueRef = useRef([]);
  const {palette} = useTheme();
  const {localize} = useLanguage();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const stancesByTopic = useMemo(() => groupBy(stances, 'topicId'), [stances]);
  const {sources, activeSource, handleSourceClick} = useSources(stances);
  const {stars, toggleStar} = useStars();
  const currentAnchor = useCurrentAnchor();

  function handleStarClick(topicId) {
    toggleStar(candidateId, topicId);
  }

  function processQueue() {
    if (queueRef.current.length > 0) {
      setSnackbarOpen(queueRef.current.shift());
    }
  }

  // borrowed from mui docs
  // https://material-ui.com/components/snackbars/#consecutive-snackbars
  async function handleLinkClick(hash) {
    const {origin, pathname} = props.location;
    await clipboard.writeText(origin + pathname + hash);

    queueRef.current.push(true);

    if (snackbarOpen) {
      // immediately begin dismissing current message
      // to start showing new one
      setSnackbarOpen(false);
    } else {
      processQueue();
    }
  }

  function handleClose(event, reason) {
    if (reason !== 'clickaway') {
      setSnackbarOpen(false);
    }
  }

  const [title, subtitle] = getCandidateTitles(
    {name, partyEn, partyFr},
    election.partyFirst,
    localize
  );

  const bio = localize(bioEn, bioFr);
  const [firstName] = name.split(' ');
  const aboutTitle = `${localize('About', 'À propos de')} ${firstName}`;
  const candidateStars = stars[candidateId] || [];

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
          introEn={election.introEn}
          introFr={election.introFr}
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
          <TableOfContents
            currentAnchor={currentAnchor - 1}
            topics={election.topics}
          >
            <SidebarLink
              color={!currentAnchor ? 'primary' : 'inherit'}
              href="#about"
            >
              {aboutTitle}
            </SidebarLink>
          </TableOfContents>
        }
      >
        <PageAnchor className="topic" name="about" />
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
            topic={topic}
            key={topic.id}
            electionSlug={election.slug}
            stances={stancesByTopic[topic.id]}
            sources={sources}
            starred={candidateStars.includes(topic.id)}
            onStarClick={() => handleStarClick(topic.id)}
            onSourceClick={handleSourceClick}
            onLinkClick={handleLinkClick}
          />
        ))}
      </PageWrapper>
      <Sources
        sources={sources}
        credits={election.credits}
        activeIndex={activeSource}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleClose}
        onExited={processQueue}
        message="Link copied to clipboard!"
      />
    </Layout>
  );
}

CandidateTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
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
          candidates(active: true) {
            id
            name
            slug
            partyEn
            partyFr
            portrait
          }
          credits {
            id
            name
            role
          }
        }
      }
    }
  }
`;
