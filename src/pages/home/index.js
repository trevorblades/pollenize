import Divider from '@material-ui/core/Divider';
import Footer from '../../components/footer';
import Grid from '@material-ui/core/Grid';
import Helmet from 'react-helmet';
import Hero from './hero';
import React, {Component, Fragment} from 'react';
import Section from './section';
import Testimonials from './testimonials';
import Typography from '@material-ui/core/Typography';
import theme from '../../theme';
import withProps from 'recompose/withProps';

const GridItem = withProps({item: true})(Grid);

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Informing voters</title>
        </Helmet>
        <Hero />
        <Section>
          <Grid container spacing={theme.spacing.unit * 5}>
            <GridItem md={8}>
              <Typography paragraph variant="headline">
                Pollenize is a nonpartisan, apolitical non-profit organization
                seeking to provide voters with the most accurate election
                information possible. We aim to make a positive impact on voter
                turnout and help spark political discussion in communities
                around the world.
              </Typography>
              <Typography variant="subheading">
                People talk about how important it is to vote, but the
                information necessary to make a confident decision is often
                sparse, unclear, and riddled with political rhetoric and jargon.
                Pollenize cuts through the noise and bring you the most clear,
                to-the-point information about topics that really matter.
              </Typography>
            </GridItem>
            <GridItem md={4}>
              <Testimonials />
            </GridItem>
          </Grid>
        </Section>
        <Divider />
        <Section>hello plz donate</Section>
        <Footer />
      </Fragment>
    );
  }
}

export default Home;
