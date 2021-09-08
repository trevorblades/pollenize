import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import SEO from './seo';
import Sources, {useSources} from './sources';
import StanceText, {KeywordContext} from './stance-text';
import TableOfContents from './table-of-contents';
import TopicWrapper from './topic-wrapper';
import {Avatar, Box, Typography, styled} from '@material-ui/core';
import {Link as GatsbyLink, graphql} from 'gatsby';
import {LanguageProvider, useLocalize} from '../utils/language';
import {Link} from 'gatsby-theme-material-ui';
import {PageHeader, PageWrapper} from './common';
import {StarsProvider} from '../utils/stars';
import {getCandidateTitles, useCurrentAnchor} from '../utils';
import {shuffle} from 'shuffle-seed';
import {triangle} from 'polished';

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
    credits,
    keywords
  } = props.data.pollenize.election;
  const {lang, languages} = props.pageContext;

  const localize = useLocalize(lang, languages);
  const currentAnchor = useCurrentAnchor();
  const stances = useMemo(
    () => topics.flatMap(topic => topic.stances),
    [topics]
  );

  const {sources, activeSource, handleSourceClick} = useSources(stances);
  const electionPath = `/${lang}/elections/${slug}`;

  return (
    <Layout>
      <SEO lang={lang} title={title} />
      <StarsProvider>
        <LanguageProvider lang={lang} languages={languages} path={props.path}>
          <KeywordContext.Provider value={keywords}>
            <HeaderBase link={electionPath} title={title}>
              <ElectionMenu
                title={title}
                electionSlug={slug}
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
              title={localize('Topic explorer')}
              subtitle={localize(
                "View candidates' main stances organized by topic"
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
              {topics.map((topic, index) => {
                const stances = shuffle(topic.stances, topic.id);
                return (
                  <TopicWrapper
                    disableDivider={!index}
                    key={topic.id}
                    topic={topic}
                  >
                    {topic.description && (
                      <Typography paragraph>{topic.description}</Typography>
                    )}
                    {stances.map((stance, index) => {
                      const isOdd = Boolean(index % 2);
                      const pathToCandidate = `${electionPath}/${stance.candidate.slug}#${topic.slug}`;
                      const [title] = getCandidateTitles(
                        stance.candidate,
                        partyFirst
                      );

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
                          mt={
                            index || topic.description || !topic.image ? 4 : 0
                          }
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
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                <Link color="inherit" to={pathToCandidate}>
                                  {title}
                                  {/* {localize('all', title)} */}
                                </Link>
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                  </TopicWrapper>
                );
              })}
            </PageWrapper>
            <Sources
              sources={sources}
              credits={credits}
              activeIndex={activeSource}
            />
          </KeywordContext.Provider>
        </LanguageProvider>
      </StarsProvider>
    </Layout>
  );
}

TopicsTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query TopicsQuery($id: ID!, $languageId: ID!) {
    pollenize {
      election(id: $id) {
        slug
        title
        intro(languageId: $languageId)
        partyFirst
        topics {
          id
          slug
          title(languageId: $languageId)
          description(languageId: $languageId)
          image
          stances {
            id
            text(languageId: $languageId)
            sources {
              id
              url
            }
            candidate {
              slug
              name
              party(languageId: $languageId)
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
          party(languageId: $languageId)
          portrait
        }
        keywords {
          id
          word(languageId: $languageId)
          definition(languageId: $languageId)
        }
      }
    }
  }
`;
