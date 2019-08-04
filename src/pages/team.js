import Header from '../components/header';
import Layout from '../components/layout';
import React from 'react';
import {Typography} from '@material-ui/core';

export default function Team() {
  return (
    <Layout>
      <Header />
      <Typography variant="h2">Our team</Typography>
    </Layout>
  );
}
