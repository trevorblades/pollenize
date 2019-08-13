import React from 'react';
import {SectionWrapper} from './common';
import {Typography} from '@material-ui/core';

export default function About() {
  return (
    <SectionWrapper
      py={10}
      textAlign="center"
      maxWidth={{
        xs: 1,
        md: 2 / 3
      }}
    >
      <Typography gutterBottom variant="h3">
        Informing voters
      </Typography>
      <Typography paragraph>
        Pollenize is a nonpartisan, apolitical non-profit organization seeking
        to provide voters with the most accurate election information possible.
        We aim to make a positive impact on voter turnout and help spark
        political discussion in communities around the world.
      </Typography>
      <Typography paragraph>
        People talk about how important it is to vote, but the information
        necessary to make a confident decision is often sparse, unclear, and
        riddled with political rhetoric and jargon. Pollenize cuts through the
        noise and bring you the most clear, to-the-point information about
        topics that really matter.
      </Typography>
    </SectionWrapper>
  );
}
