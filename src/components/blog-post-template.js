import Footer from './footer';
import Header from './header';
import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
import rehypeReact from 'rehype-react';
import {
  Avatar,
  Box,
  Divider,
  Link as MuiLink,
  Typography
} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {Link, graphql} from 'gatsby';
import {MdChevronLeft} from 'react-icons/md';
import {SectionWrapper} from './common';
import {withProps} from 'recompose';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: withProps({variant: 'h3', paragraph: true})(Typography),
    h2: withProps({variant: 'h4', paragraph: true})(Typography),
    h3: withProps({variant: 'h5', paragraph: true})(Typography),
    h4: withProps({variant: 'h6', paragraph: true})(Typography),
    h5: withProps({variant: 'subtitle1', paragraph: true})(Typography),
    h6: withProps({variant: 'subtitle2', paragraph: true})(Typography),
    p: withProps({paragraph: true})(Typography),
    li: withProps({component: 'li', gutterBottom: true})(Typography)
  }
}).Compiler;

export default function BlogPostTemplate(props) {
  const {frontmatter, htmlAst} = props.data.markdownRemark;
  const {date, title, author, authorImage, image, imageCredit} = frontmatter;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <SectionWrapper>
        <Box display="flex">
          <MuiLink
            component={Link}
            to="/blog"
            color="inherit"
            variant="overline"
          >
            <Box display="flex" alignItems="center">
              <MdChevronLeft
                size={20}
                style={{
                  marginLeft: -4,
                  marginRight: 4
                }}
              />
              All posts
            </Box>
          </MuiLink>
        </Box>
        <Typography gutterBottom variant="h2">
          {title}
        </Typography>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar src={authorImage.publicURL} style={{marginRight: 16}} />
          <div>
            <Typography variant="h6">
              {author} &bull; {new Date(date).toLocaleDateString()}
            </Typography>
          </div>
        </Box>
        <Box mb={4}>
          <img src={image.publicURL} width="100%" />
          <Typography display="block" variant="caption" color="textSecondary">
            Photo by {imageCredit}
          </Typography>
        </Box>
        <Box
          width={{
            xs: 1,
            md: 3 / 4,
            lg: 2 / 3
          }}
        >
          {renderAst(htmlAst)}
        </Box>
      </SectionWrapper>
      <Divider />
      <Footer />
    </Layout>
  );
}

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    markdownRemark(id: {eq: $id}) {
      frontmatter {
        date
        title
        author
        authorImage {
          publicURL
        }
        image {
          publicURL
        }
        imageCredit
      }
      htmlAst
    }
  }
`;
