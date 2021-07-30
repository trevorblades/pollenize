import ElectionMenu from '../election-menu';
import HeaderBase from '../header-base';
import Layout from '../layout';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import React, {Fragment, useMemo, useRef, useState} from 'react';
import SEO from '../seo';
import Sources, {useSources} from '../sources';
import TableOfContents, {SidebarLink} from '../table-of-contents';
import TopicSection from './topic-section';
import clipboard from 'clipboard-polyfill';
import {
  Avatar,
  Snackbar,
  Typography,
  styled,
  useTheme
} from '@material-ui/core';
import {ContentWrapper, PageAnchor, PageHeader, PageWrapper} from '../common';
import {LanguageProvider, useLocalize} from '../../utils/language';
import {differenceInYears} from 'date-fns';
import {getCandidateTitles, useCurrentAnchor} from '../../utils';
import {graphql} from 'gatsby';
import {groupBy} from 'lodash';
import {size} from 'polished';
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
    party,
    bio,
    color,
    portrait,
    birthDate,
    election,
    hometown,
    stances
  } = props.data.pollenize.candidate;
  const {lang, languages} = props.pageContext;

  const queueRef = useRef([]);
  const {palette} = useTheme();
  const localize = useLocalize(lang);
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
    {name, party},
    election.partyFirst
  );

  const [firstName] = name.split(' ');
  const aboutTitle = `${localize('About')} ${firstName}`;
  const aboutShown = Boolean(birthDate || hometown || bio);

  const candidateStars = stars[candidateId] || [];
  const electionPath = `/${lang}/elections/${election.slug}`;

  return (
    <Layout>
      <SEO title={title} lang={lang} />
      <LanguageProvider lang={lang} languages={languages} path={props.path}>
        <HeaderBase link={electionPath} title={title}>
          <ElectionMenu
            title={election.title}
            electionSlug={election.slug}
            candidates={election.candidates}
            partyFirst={election.partyFirst}
            intro={election.intro}
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
              topics={election.topics}
              getActiveProps={index => ({
                style: {
                  color: index === currentAnchor - aboutShown && color
                }
              })}
            >
              {aboutShown && (
                <SidebarLink
                  href="#about"
                  style={{color: !currentAnchor && color}}
                >
                  {aboutTitle}
                </SidebarLink>
              )}
            </TableOfContents>
          }
        >
          {aboutShown && (
            <Fragment>
              <PageAnchor className="topic" name="about" />
              <ContentWrapper>
                <Typography gutterBottom variant="h4">
                  {aboutTitle}
                </Typography>
                {birthDate && (
                  <Typography gutterBottom>
                    {differenceInYears(Date.now(), Number(birthDate))}{' '}
                    {localize('years old')}
                  </Typography>
                )}
                {hometown && (
                  <Typography gutterBottom>
                    {localize('Hometown')}: {hometown}
                  </Typography>
                )}
                {bio && <Markdown components={{p: Typography}}>{bio}</Markdown>}
              </ContentWrapper>
            </Fragment>
          )}
          {election.topics.map(topic => (
            <TopicSection
              topic={topic}
              key={topic.id}
              electionPath={electionPath}
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
      </LanguageProvider>
    </Layout>
  );
}

CandidateTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query CandidateQuery($id: ID!, $languageId: ID!) {
    pollenize {
      candidate(id: $id) {
        id
        name
        portrait
        party(languageId: $languageId)
        bio(languageId: $languageId)
        color
        birthDate
        hometown
        stances {
          id
          text(languageId: $languageId)
          topicId
          sources {
            id
            url
          }
        }
        election {
          id
          slug
          title
          partyFirst
          intro(languageId: $languageId)
          topics {
            id
            slug
            image
            title(languageId: $languageId)
            description(languageId: $languageId)
          }
          candidates(active: true) {
            id
            name
            slug
            party(languageId: $languageId)
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
