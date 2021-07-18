import PropTypes from 'prop-types';
import React from 'react';
import {Helmet} from 'react-helmet';
import {graphql, useStaticQuery} from 'gatsby';

export default function SEO({title, description, lang}) {
  const {site} = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
        }
      }
    }
  `);

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description || site.siteMetadata.description}
      />
      <meta
        property="og:image"
        content="https://pbs.twimg.com/profile_images/1014798953366220800/K5AktL6i_400x400.jpg"
      />
      <meta name="twitter:site" content="@pollenizeorg" />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  lang: PropTypes.string.isRequired
};
