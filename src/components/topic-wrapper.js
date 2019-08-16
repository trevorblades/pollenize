import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Box, Divider, Typography} from '@material-ui/core';
import {ContentWrapper, PageAnchor} from './common';
import {size} from 'polished';
import {styled} from '@material-ui/styles';
import {useLanguage} from '../utils/language';

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
  const {localize} = useLanguage();
  const title = localize(props.topic.titleEn, props.topic.titleFr);
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
  disableDivider: PropTypes.bool
};
