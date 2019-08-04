import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import TableOfContents from './table-of-contents';
import TopicWrapper from './topic-wrapper';
import {Avatar, Box, Typography} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {LanguageContext} from '../utils/language';
import {PageHeader, PageWrapper} from './common';
import {graphql} from 'gatsby';
import {localize} from '../utils';
import {styled} from '@material-ui/styles';
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
    partyFirst
  } = props.data.pollenize.election;
  const [language] = useContext(LanguageContext);
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <HeaderBase link={`/elections/${slug}`} title={title}>
        <ElectionMenu
          title={title}
          slug={slug}
          candidates={candidates}
          partyFirst={partyFirst}
          topicExplorerActive
        />
      </HeaderBase>
      <PageHeader
        title={localize('Topic explorer', 'Explorateur de sujet', language)}
        bgcolor="grey.200"
      />
      <PageWrapper
        sidebar={<TableOfContents language={language} topics={topics} />}
      >
        {topics.map((topic, index) => {
          const description = localize(
            topic.descriptionEn,
            topic.descriptionFr,
            language
          );
          return (
            <TopicWrapper
              disableDivider={!index}
              key={topic.id}
              topic={topic}
              language={language}
            >
              {description && <Typography paragraph>{description}</Typography>}
              {topic.stances.map((stance, index) => {
                const isOdd = Boolean(index % 2);
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
                    <Avatar src={stance.candidate.portrait} />
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
                          {localize(stance.textEn, stance.textFr, language)}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {stance.candidate.name}
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
