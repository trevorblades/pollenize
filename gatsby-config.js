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
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-53329033-1'
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Pollenize',
        fieldName: 'pollenize',
        url: process.env.GATSBY_API_URL
      }
    }
  ]
};
