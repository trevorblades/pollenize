const {createFilePath} = require('gatsby-source-filesystem');
const {createPrinterNode} = require('gatsby-plugin-printer');

const BlogPostTemplate = require.resolve('./src/components/blog-post-template');
const CandidateTemplate = require.resolve(
  './src/components/candidate-template'
);
const ElectionTemplate = require.resolve('./src/components/election-template');
const TopicsTemplate = require.resolve('./src/components/topics-template');
const PrinterTemplate = require.resolve('./src/components/printer-template');

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

exports.createPages = async ({actions, graphql}) => {
  const {data} = await graphql(`
    {
      site {
        buildTime(formatString: "X")
      }
      pollenize {
        elections {
          id
          slug
          title
          languages {
            id
            code
            name
          }
          candidates(active: true) {
            id
            slug
          }
        }
      }
    }
  `);

  const {elections} = data.pollenize;
  for (const {id, slug, title, candidates, languages} of elections) {
    const fileName = slug + data.site.buildTime;
    createPrinterNode({
      id: `${id} >>> Printer`,
      fileName,
      outputDir: 'social',
      data: {
        title
      },
      component: PrinterTemplate
    });

    for (const language of languages) {
      const path = `/${language.code}/elections/${slug}`;
      const context = {
        id,
        fileName,
        lang: language.code,
        languageId: language.id,
        languages
      };

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
