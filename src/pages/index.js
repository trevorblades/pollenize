import Layout from '../components/layout';
import React from 'react';
import {Button, Typography} from '@material-ui/core';
import {Link} from 'gatsby';

export default function Index() {
  return (
    <Layout>
      <Typography variant="h2">Pollenize</Typography>
      <Typography variant="h4">Informing voters</Typography>
      <Button component={Link} to="/elections">
        Go to elections
      </Button>
    </Layout>
  );
}
