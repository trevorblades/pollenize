import Header from '../components/header';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React from 'react';
import {Box, Card, Grid, Typography} from '@material-ui/core';
import {Link, graphql} from 'gatsby';
import {useTheme} from '@material-ui/styles';

export default function Elections(props) {
  const {breakpoints} = useTheme();
  return (
    <Layout>
      <Header />
      <Box width={1} maxWidth={breakpoints.values.lg} p={8} mx="auto">
        <Typography gutterBottom variant="h2">
          Elections
        </Typography>
        <Grid container spacing={3}>
          {props.data.pollenize.elections.map(election => (
            <Grid item xs={3} key={election.id}>
              <Card>
                <Typography variant="subtitle1">{election.title}</Typography>
                <img height={80} src={election.flag} />
                <Link to={`/elections/${election.slug}`}>Go to Election</Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}

Elections.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  {
    pollenize {
      elections {
        id
        slug
        title
        flag
      }
    }
  }
`;
