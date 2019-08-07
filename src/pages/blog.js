import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React from 'react';
import {Box, Divider, Link as MuiLink, Typography} from '@material-ui/core';
import {Link, graphql} from 'gatsby';
import {SectionWrapper} from '../components/common';

export default function Blog(props) {
  const {nodes} = props.data.allMarkdownRemark;
  return (
    <Layout>
      <Header />
      <SectionWrapper>
        <Typography gutterBottom variant="h2">
          Pollenize blog
        </Typography>
        <Box
          width={{
            xs: 1,
            md: 3 / 4,
            lg: 2 / 3
          }}
        >
          {nodes.map((node, index) => {
            const {title, author} = node.frontmatter;
            return (
              <Box key={node.id} mt={index ? 4 : 0}>
                <Typography variant="h4">
                  <MuiLink
                    color="inherit"
                    component={Link}
                    to={'/blog' + node.fields.slug}
                  >
                    {title}
                  </MuiLink>
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  {author}
                </Typography>
                <Typography variant="body2">{node.excerpt}</Typography>
              </Box>
            );
          })}
        </Box>
      </SectionWrapper>
      <Divider />
      <Footer />
    </Layout>
  );
}

Blog.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          author
        }
        excerpt
      }
    }
  }
`;
