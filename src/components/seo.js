import PropTypes from 'prop-types';
import React from 'react';
import {Helmet} from 'react-helmet';

export default function SEO(props) {
  const imageUrl = `https://pollenize.org/social/${props.fileName}.png`;
  return (
    <Helmet>
      <html lang={props.lang} />
      <title>{props.title}</title>
      <meta name="og:title" content={props.title} />
      <meta name="og:image" content={imageUrl} />
      <meta name="twitter:site" content="@pollenizeorg" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired
};
