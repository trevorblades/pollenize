import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Box, Divider, Typography, styled} from '@material-ui/core';
import {ContentWrapper, PageAnchor} from './common';
import {size} from 'polished';

const StyledImage = styled('img')({
  ...size('100%'),
  objectFit: 'cover',
  pointerEvents: 'none',
  userSelect: 'none',
  position: 'absolute',
  top: 0,
  left: 0
});

export default function TopicWrapper(props) {
  return (
    <Fragment>
      <PageAnchor className="topic" name={props.topic.slug} />
      {props.topic.image ? (
        <Box
          py={{
            xs: 12,
            lg: 15
          }}
          display="flex"
          justifyContent="center"
          bgcolor="grey.200"
          position="relative"
        >
          <StyledImage src={props.topic.image} loading="lazy" />
          <Box bgcolor="background.paper" py={1} px={2} position="relative">
            <Typography variant="h4">{props.topic.title}</Typography>
          </Box>
        </Box>
      ) : (
        !props.disableDivider && <Divider />
      )}
      <ContentWrapper>
        {!props.topic.image && (
          <Typography gutterBottom variant="h4">
            {props.topic.title}
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
  disableDivider: PropTypes.bool
};
