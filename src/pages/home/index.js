import Helmet from 'react-helmet';
import Hero from './hero';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../theme';

const Info = styled.div({
  width: '100%',
  maxWidth: theme.breakpoints.values.md,
  margin: '0 auto',
  padding: theme.spacing.unit * 6
});

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Informing voters</title>
        </Helmet>
        <Hero />
        <Info>
          <Typography paragraph variant="headline">
            Pollenize is a nonpartisan, apolitical non-profit organization
            seeking to provide voters with the most accurate election
            information possible. We aim to make a positive impact on voter
            turnout and help spark political discussion in communities around
            the world.
          </Typography>
          <Typography variant="subheading">
            People talk about how important it is to vote, but the information
            necessary to make a confident decision is often sparse, unclear, and
            riddled with political rhetoric and jargon. We cut through the noise
            and bring you the most clear, to-the-point information about topics
            that really matter.
          </Typography>
        </Info>
      </Fragment>
    );
  }
}

export default Home;
