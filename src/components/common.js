import React from 'react';
import {Box} from '@material-ui/core';
import {HEADER_HEIGHT} from './header-base';
import {styled} from '@material-ui/styles';

export const PageAnchor = styled('a')({
  display: 'block',
  height: HEADER_HEIGHT,
  marginTop: -HEADER_HEIGHT
});

export function ContentBox(props) {
  return (
    <Box
      py={{
        xs: 5,
        lg: 7
      }}
      pr={{
        xs: 5,
        lg: 8
      }}
      pl={{
        xs: 5,
        md: 0
      }}
      {...props}
    />
  );
}
