import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import Sources, {useSources} from './sources';
import StanceText from './stance-text';
import TableOfContents from './table-of-contents';
import TopicWrapper from './topic-wrapper';
import {Avatar, Box, Typography, styled} from '@material-ui/core';
import {Link as GatsbyLink, graphql} from 'gatsby';
import {Helmet} from 'react-helmet';
import {Link} from 'gatsby-theme-material-ui';
import {PageHeader, PageWrapper} from './common';
import {getCandidateTitles, useCurrentAnchor} from '../utils';
import {triangle} from 'polished';
import {useLanguage} from '../utils/language';

const triangleWidth = 24;
const Triangle = styled(Box)(({theme}) =>
  triangle({
    pointingDirection: 'top',
    height: `${triangleWidth / 1.5}px`,
    width: `${triangleWidth}px`,
    foregroundColor: theme.palette.grey[200]
  })
);

export default function TopicsTemplate(props) {
  const {
    title,
    slug,
    topics,
    candidates,
    intro,
    partyFirst,
    credits
  } = props.data.pollenize.election;

  const {localize} = useLanguage();
  const currentAnchor = useCurrentAnchor();
  const stances = useMemo(() => topics.flatMap(topic => topic.stances), [
    topics
  ]);

  const {sources, activeSource, handleSourceClick} = useSources(stances);
  const {id, lang, languages} = props.pageContext;
  const electionPath = `/${lang}/elections/${slug}`;

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{title}</title>
      </Helmet>
      <HeaderBase link={electionPath} title={title}>
        <ElectionMenu
          title={title}
          electionSlug={slug}
          electionId={id}
          candidates={candidates}
          partyFirst={partyFirst}
          intro={intro}
          active="topics"
          lang={lang}
          languages={languages}
          path={props.path}
        />
      </HeaderBase>
      <PageHeader
        title={localize('Topic explorer', 'Explorateur de sujets')}
        subtitle={localize(
          "View candidates' main stances organized by topic",
          'Voir les positions principales des candidats organisées par sujet'
        )}
        bgcolor="grey.200"
      />
      <PageWrapper
        sidebar={
          <TableOfContents
            topics={topics}
            getActiveProps={index => ({
              color: index === currentAnchor ? 'primary' : 'inherit'
            })}
          />
        }
      >
        {topics.map((topic, index) => (
          <TopicWrapper disableDivider={!index} key={topic.id} topic={topic}>
            {topic.description && (
              <Typography paragraph>{topic.description}</Typography>
            )}
            {topic.stances.map((stance, index) => {
              const isOdd = Boolean(index % 2);
              const pathToCandidate = `${electionPath}/${stance.candidate.slug}#${topic.slug}`;
              const [title] = getCandidateTitles(stance.candidate, partyFirst);

              return (
                <Box
                  key={stance.id}
                  maxWidth={{
                    xs: 1,
                    sm: 0.75
                  }}
                  display="flex"
                  alignItems="flex-end"
                  flexDirection={isOdd ? 'row-reverse' : 'row'}
                  ml={isOdd ? 'auto' : 0}
                  mt={index || topic.description || !topic.image ? 4 : 0}
                >
                  <Avatar
                    component={GatsbyLink}
                    src={stance.candidate.portrait}
                    to={pathToCandidate}
                  />
                  <Box
                    bgcolor="grey.200"
                    borderRadius="borderRadius"
                    position="relative"
                    {...{
                      [isOdd ? 'mr' : 'ml']: 2
                    }}
                  >
                    <Triangle
                      position="absolute"
                      bottom={0}
                      {...{
                        [isOdd ? 'right' : 'left']: triangleWidth / -2
                      }}
                    />
                    <Box p={2}>
                      <Typography gutterBottom>
                        <StanceText
                          stance={stance}
                          sources={sources}
                          onSourceClick={handleSourceClick}
                        />
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        <Link color="inherit" to={pathToCandidate}>
                          {title}
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </TopicWrapper>
        ))}
      </PageWrapper>
      <Sources sources={sources} credits={credits} activeIndex={activeSource} />
    </Layout>
  );
}

TopicsTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query TopicsQuery($id: ID!, $lang: String!) {
    pollenize {
      election(id: $id) {
        slug
        title
        intro(lang: $lang)
        partyFirst
        topics {
          id
          slug
          title(lang: $lang)
          description(lang: $lang)
          image
          stances {
            id
            text(lang: $lang)
            sources {
              id
              url
            }
            candidate {
              slug
              name
              party(lang: $lang)
              portrait
            }
          }
        }
        credits {
          id
          name
          role
        }
        candidates(active: true) {
          id
          name
          slug
          party(lang: $lang)
          portrait
        }
      }
    }
  }
`;
