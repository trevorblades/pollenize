import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React from 'react';
import {Avatar, Box, Divider, Typography, styled} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {Link} from 'gatsby-theme-material-ui';
import {SectionWrapper} from '../components/common';
import {graphql} from 'gatsby';
import {size} from 'polished';

const StyledAvatar = styled(Avatar)(({theme}) => ({
  ...size(28),
  marginRight: theme.spacing(1.5)
}));

export default function Blog(props) {
  const {nodes} = props.data.allMarkdownRemark;
  return (
    <Layout>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <Header />
      <SectionWrapper>
        <Typography variant="h2">Blog</Typography>
        <Box
          width={{
            xs: 1,
            md: 3 / 4,
            lg: 2 / 3
          }}
        >
          {nodes.map(node => {
            const {date, title, author, authorImage} = node.frontmatter;
            return (
              <Box key={node.id} mt={4}>
                <Typography variant="h5">
                  <Link color="inherit" to={'/blog' + node.fields.slug}>
                    {title}
                  </Link>
                </Typography>
                <Box display="flex" alignItems="center" my={1}>
                  <StyledAvatar src={authorImage.publicURL} />
                  <Typography variant="subtitle1">
                    {author} &bull; {date}
                  </Typography>
                </Box>
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
    allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          author
          date(formatString: "MMMM D, YYYY")
          authorImage {
            publicURL
          }
        }
        excerpt
      }
    }
  }
`;
