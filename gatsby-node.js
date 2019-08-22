const {createFilePath} = require('gatsby-source-filesystem');

const BlogPostTemplate = require.resolve('./src/components/blog-post-template');
const ElectionTemplate = require.resolve('./src/components/election-template');
const TopicsTemplate = require.resolve('./src/components/topics-template');
const CandidateTemplate = require.resolve(
  './src/components/candidate-template'
);

exports.onCreateNode = async ({node, actions, getNode}) => {
  if (node.internal.type === 'MarkdownRemark') {
    actions.createNodeField({
      node,
      name: 'slug',
      value: createFilePath({
        node,
        getNode
      })
    });
  }
};

const languages = {
  en: 'English',
  fr: 'Français'
};

exports.createPages = async ({actions, graphql}) => {
  const electionResults = await graphql(`
    {
      pollenize {
        elections {
          id
          slug
          candidates(active: true) {
            id
            slug
          }
        }
      }
    }
  `);

  const {elections} = electionResults.data.pollenize;
  for (const {id, slug, candidates} of elections) {
    for (const lang in languages) {
      const context = {id, lang, languages};
      const path = `/${lang}/elections/${slug}`;

      actions.createPage({
        path,
        component: ElectionTemplate,
        context
      });

      for (const {id, slug} of candidates) {
        actions.createPage({
          path: `${path}/${slug}`,
          component: CandidateTemplate,
          context: {
            ...context,
            id
          }
        });
      }

      actions.createPage({
        path: `${path}/topics`,
        component: TopicsTemplate,
        context
      });
    }
  }

  const blogResults = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  const {nodes} = blogResults.data.allMarkdownRemark;
  for (const node of nodes) {
    actions.createPage({
      path: '/blog' + node.fields.slug,
      component: BlogPostTemplate,
      context: {
        id: node.id
      }
    });
  }
};
