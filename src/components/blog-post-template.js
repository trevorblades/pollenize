import Footer from './footer';
import Header from './header';
import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
// import rehypeReact from 'rehype-react';
import {Box, Divider, Typography} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {SectionWrapper} from './common';
import {graphql} from 'gatsby';

// TODO: render mui components and make them using recompose (with import plugin)
// const renderAst = new rehypeReact({
//   createElement: React.createElement,
//   components: {
//     p: withProps({
//       paragraph: true
//     })(Typography)
//   }
// }).Compiler;

export default function BlogPostTemplate(props) {
  const {
    frontmatter: {title, author},
    html
  } = props.data.markdownRemark;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <SectionWrapper>
        <Typography variant="overline">Pollenize blog</Typography>
        <Typography gutterBottom variant="h2">
          {title}
        </Typography>
        <Typography variant="h6">{author}</Typography>
        <Typography paragraph variant="body2">
          {/* TODO: hook up real dates from medium */}
          2018/09/12
        </Typography>
        <Box
          width={{
            xs: 1,
            md: 3 / 4,
            lg: 2 / 3
          }}
        >
          <div dangerouslySetInnerHTML={{__html: html}} />
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
        title
        author
        # authorImage
      }
      html
    }
  }
`;
