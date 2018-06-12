import Button from '@material-ui/core/Button';
import Helmet from 'react-helmet';
import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../theme';
import {Link} from 'react-router-dom';

const Hero = styled.div({
  padding: theme.spacing.unit * 5,
  textAlign: 'center'
});

const Home = () => (
  <Fragment>
    <Helmet>
      <title>Informing voters</title>
    </Helmet>
    <Hero>
      <Typography gutterBottom variant="display3">
        Québec 2018
      </Typography>
      <Typography paragraph variant="subheading">
        Our comprehensive election guide
      </Typography>
      <Button
        size="large"
        color="primary"
        variant="raised"
        component={Link}
        to="/elections/quebec-2018"
      >
        Check it out
      </Button>
    </Hero>
  </Fragment>
);

export default Home;
