import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import TableOfContents from './table-of-contents';
import TopicWrapper from './topic-wrapper';
import {Avatar, Box, Typography} from '@material-ui/core';
import {ContentWrapper, PageWrapper} from './common';
import {Helmet} from 'react-helmet';
import {LanguageContext} from '../utils/language';
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
  const {title, slug, topics} = props.data.pollenize.election;
  const [language] = useContext(LanguageContext);
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <HeaderBase link={`/elections/${slug}`} title={title}>
        nav
      </HeaderBase>
      <PageWrapper
        sidebar={<TableOfContents language={language} topics={topics} />}
      >
        <ContentWrapper>
          <Typography gutterBottom variant="h3">
            Topic explorer
          </Typography>
        </ContentWrapper>
        {topics.map(topic => {
          const description = localize(
            topic.descriptionEn,
            topic.descriptionFr,
            language
          );
          return (
            <TopicWrapper key={topic.id} topic={topic} language={language}>
              {description && <Typography paragraph>{description}</Typography>}
              {topic.stances.map((stance, index) => {
                const isOdd = Boolean(index % 2);
                return (
                  <Box
                    key={stance.id}
                    maxWidth={0.75}
                    display="flex"
                    alignItems="flex-end"
                    flexDirection={isOdd ? 'row-reverse' : 'row'}
                    ml={isOdd ? 'auto' : 0}
                    mt={index || description ? 4 : 0}
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
      }
    }
  }
`;
