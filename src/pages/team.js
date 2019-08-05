import Header from '../components/header';
import Layout from '../components/layout';
import React from 'react';
import team from '../assets/images/team.jpg';
import {Box, Typography} from '@material-ui/core';
import {useTheme} from '@material-ui/styles';

export default function Team() {
  const {breakpoints} = useTheme();
  return (
    <Layout>
      <Header />
      <Box
        bgcolor="#c7c7c4"
        style={{
          backgroundImage: 'linear-gradient(to top right, white, transparent)'
        }}
      >
        <Box maxWidth={breakpoints.values.lg} mx="auto" px={8} py={10}>
          <Typography gutterBottom variant="h2">
            Our team
          </Typography>
          <Box ml={-8} mb={3}>
            <img width="100%" src={team} />
          </Box>
          <Box width={2 / 3}>
            <Typography gutterBottom variant="h6">
              Pollenize is created by a collection of friends spread out across
              6 cities and 3 countries who are passionate about educating and
              creating beautiful, functional experiences. Keep reading to learn
              more about our crew.
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Pictured (from left to right): Miguel, Ben, Matheson, Trevor,
              Marvin, and Joe
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
