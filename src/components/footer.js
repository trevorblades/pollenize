import React, {Fragment} from 'react';
import {SectionWrapper} from './common';
import {Typography} from '@material-ui/core';

export function Colophon() {
  return (
    <Fragment>&copy; {new Date().getFullYear()} Really Awesome Doings</Fragment>
  );
}

export default function Footer() {
  return (
    <SectionWrapper>
      <Typography color="textSecondary">
        <Colophon />
      </Typography>
    </SectionWrapper>
  );
}
