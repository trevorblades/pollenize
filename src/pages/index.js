import Header from '../components/header';
import Hero from '../components/hero';
import Layout from '../components/layout';
import React from 'react';
import {Box, Typography} from '@material-ui/core';
import {useTheme} from '@material-ui/styles';

export default function Index() {
  const {breakpoints} = useTheme();
  return (
    <Layout>
      <Header />
      <Hero />
      <Box maxWidth={breakpoints.values.lg} px={8} py={10} mx="auto">
        <Typography gutterBottom variant="h3">
          Informing voters
        </Typography>
        <Typography paragraph>
          Pollenize is a nonpartisan, apolitical non-profit organization seeking
          to provide voters with the most accurate election information
          possible. We aim to make a positive impact on voter turnout and help
          spark political discussion in communities around the world.
        </Typography>
        <Typography paragraph>
          People talk about how important it is to vote, but the information
          necessary to make a confident decision is often sparse, unclear, and
          riddled with political rhetoric and jargon. Pollenize cuts through the
          noise and bring you the most clear, to-the-point information about
          topics that really matter.
        </Typography>
      </Box>
    </Layout>
  );
}
