import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
import TableOfContents from './table-of-contents';
import TopicWrapper from './topic-wrapper';
import {Avatar, Box, Link as MuiLink, Typography} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {Link, graphql} from 'gatsby';
import {PageHeader, PageWrapper} from './common';
import {getCandidateTitles} from '../utils';
import {styled} from '@material-ui/styles';
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
    introEn,
    introFr,
    partyFirst
  } = props.data.pollenize.election;
  const {localize} = useLanguage();
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <HeaderBase link={`/elections/${slug}`} title={title}>
        <ElectionMenu
          title={title}
          electionSlug={slug}
          candidates={candidates}
          partyFirst={partyFirst}
          intro={localize(introEn, introFr)}
          topicExplorerActive
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
      <PageWrapper sidebar={<TableOfContents topics={topics} />}>
        {topics.map((topic, index) => {
          const description = localize(
            topic.descriptionEn,
            topic.descriptionFr
          );
          return (
            <TopicWrapper disableDivider={!index} key={topic.id} topic={topic}>
              {description && <Typography paragraph>{description}</Typography>}
              {topic.stances.map((stance, index) => {
                const isOdd = Boolean(index % 2);
                const pathToCandidate = `/elections/${slug}/${stance.candidate.slug}#${topic.slug}`;
                const [title] = getCandidateTitles(
                  stance.candidate,
                  partyFirst,
                  localize
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
                    mt={index || description || !topic.image ? 4 : 0}
                  >
                    <Avatar
                      component={Link}
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
                          {localize(stance.textEn, stance.textFr)}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          <MuiLink
                            color="inherit"
                            component={Link}
                            to={pathToCandidate}
                          >
                            {title}
                          </MuiLink>
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
      {/* TODO: add sources & colophon */}
    </Layout>
  );
}

TopicsTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query TopicsQuery($id: ID!) {
    pollenize {
      election(id: $id) {
        slug
        title
        introEn
        introFr
        partyFirst
        topics {
          id
          slug
          titleEn
          titleFr
          descriptionEn
          descriptionFr
          image
          stances {
            id
            textEn
            textFr
            candidate {
              slug
              name
              partyEn
              partyFr
              portrait
            }
          }
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
`;
