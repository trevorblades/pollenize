import React from 'react';
import {SectionWrapper} from './common';
import {Typography} from '@material-ui/core';

export default function Footer() {
  return (
    <SectionWrapper>
      <Typography color="textSecondary">
        &copy; {new Date().getFullYear()} Really Awesome Doings
      </Typography>
    </SectionWrapper>
  );
}
