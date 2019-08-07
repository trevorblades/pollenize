require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Pollenize',
    description:
      'Pollenize is an apolitical non-profit providing voters with accurate and easy-to-understand information about elections.'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-material-ui',
    'gatsby-plugin-svgr',
    'gatsby-plugin-lodash',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-53329033-1'
      }
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/assets/logo.svg'
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Pollenize',
        fieldName: 'pollenize',
        url: process.env.GATSBY_API_URL
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'src/posts',
        name: 'posts'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              ignoreFileExtensions: []
            }
          }
        ]
      }
    }
  ]
};
