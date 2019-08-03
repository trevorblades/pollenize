import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import TableOfContents from './table-of-contents';
import {Avatar, Box, Typography} from '@material-ui/core';
import {ContentWrapper, PageWrapper} from './common';
import {Helmet} from 'react-helmet';
import {LanguageContext} from '../utils/language';
import {graphql} from 'gatsby';

export default function TopicsTemplate(props) {
  const {title, slug, topics} = props.data.pollenize.election;
  const [language] = useContext(LanguageContext);
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <HeaderBase link={`/elections/${slug}`} title={title} />
      <PageWrapper
        sidebar={<TableOfContents language={language} topics={topics} />}
      >
        <ContentWrapper>
          <Typography gutterBottom variant="h3">
            Topic explorer
          </Typography>
          <Box maxWidth={0.75} display="flex" alignItems="flex-end">
            <Avatar src="https://i.imgur.com/xzNxB9U.png" />
            <Box
              bgcolor="grey.200"
              borderRadius="borderRadius"
              position="relative"
              ml={2}
            >
              <Box p={2}>
                <Typography gutterBottom>
                  Test test test jlkasd flkjaf dslkj fdsalkj asdflkjdfs alkjsadf
                  lkj fsadkljas dflkj sdaflkja fsdlkj afdslkj{' '}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  John Tory
                </Typography>
              </Box>
            </Box>
          </Box>
        </ContentWrapper>
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
          titleEn
          titleFr
          descriptionEn
          descriptionFr
        }
      }
    }
  }
`;
