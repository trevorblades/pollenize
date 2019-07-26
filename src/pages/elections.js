import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import {Link, graphql} from 'gatsby';

export default function Elections(props) {
  return (
    <Layout>
      <Typography variant="h2">Elections</Typography>
      <Button component={Link} to="/">
        Back to homes
      </Button>
      <Box padding={5}>
        {props.data.pollenize.elections.map(election => (
          <div key={election.id}>
            <Typography variant="subtitle1">{election.title}</Typography>
            <img height={80} src={election.flag} />
            <Link to={`/elections/${election.slug}`}>Go to Election</Link>
          </div>
        ))}
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
