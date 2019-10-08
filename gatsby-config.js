const dotenv = require('dotenv');
const {webFontsConfig} = require('@trevorblades/mui-theme');

dotenv.config();

module.exports = {
  siteMetadata: {
    title: 'Pollenize',
    description:
      'Pollenize is an apolitical non-profit providing voters with accurate and easy-to-understand information about elections.'
  },
  plugins: [
    'gatsby-theme-apollo',
    'gatsby-plugin-svgr',
    'gatsby-plugin-lodash',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-theme-material-ui',
      options: {webFontsConfig}
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-53329033-1'
      }
    },
    // {
    //   resolve: 'gatsby-plugin-favicon',
    //   options: {
    //     logo: './src/assets/logo.svg'
    //   }
    // },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Pollenize',
        fieldName: 'pollenize',
        url: `${process.env.GATSBY_API_URL}/graphql`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'src/posts',
        name: 'posts'
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-printer'
  ]
};
