import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {graphql, useStaticQuery} from 'gatsby';

export default function Layout(props) {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const {title, description} = data.site.siteMetadata;
  return (
    <Fragment>
      <Helmet defaultTitle={title} titleTemplate={`%s - ${title}`}>
        <meta name="description" content={description} />
        {/* TODO: add other meta, social tags */}
      </Helmet>
      {props.children}
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
