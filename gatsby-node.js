const ElectionTemplate = require.resolve('./src/components/election-template');
const TopicsTemplate = require.resolve('./src/components/topics-template');
const CandidateTemplate = require.resolve(
  './src/components/candidate-template'
);

exports.createPages = async ({actions, graphql}) => {
  const {data} = await graphql(`
    {
      pollenize {
        elections {
          id
          slug
          candidates {
            id
            slug
          }
        }
      }
    }
  `);

  for (const {id, slug, candidates} of data.pollenize.elections) {
    const path = `/elections/${slug}`;
    actions.createPage({
      path,
      component: ElectionTemplate,
      context: {
        id
      }
    });

    actions.createPage({
      path: `${path}/topics`,
      component: TopicsTemplate,
      context: {
        id
      }
    });

    for (const {id, slug} of candidates) {
      actions.createPage({
        path: `${path}/${slug}`,
        component: CandidateTemplate,
        context: {
          id
        }
      });
    }
  }
};
