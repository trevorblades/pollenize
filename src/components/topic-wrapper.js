import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Box, Divider, Typography} from '@material-ui/core';
import {ContentWrapper, PageAnchor} from './common';
import {localize} from '../utils';

export default function TopicWrapper(props) {
  const title = localize(
    props.topic.titleEn,
    props.topic.titleFr,
    props.language
  );
  return (
    <Fragment>
      <PageAnchor name={props.topic.slug} />
      {props.topic.image ? (
        <Box
          py={{
            xs: 12,
            lg: 15
          }}
          display="flex"
          justifyContent="center"
          bgcolor="grey.200"
          style={{
            backgroundImage: `url(${props.topic.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <Box bgcolor="background.paper" py={1} px={2}>
            <Typography variant="h4">{title}</Typography>
          </Box>
        </Box>
      ) : (
        !props.disableDivider && <Divider />
      )}
      <ContentWrapper>
        {!props.topic.image && (
          <Typography gutterBottom variant="h4">
            {title}
          </Typography>
        )}
        {props.children}
      </ContentWrapper>
    </Fragment>
  );
}

TopicWrapper.propTypes = {
  topic: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  language: PropTypes.string.isRequired,
  disableDivider: PropTypes.bool
};
