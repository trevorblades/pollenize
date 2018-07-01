import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Footer from '../../components/footer';
import Grid from '@material-ui/core/Grid';
import Helmet from 'react-helmet';
import Hero from './hero';
import React, {Component, Fragment} from 'react';
import Section from '../../components/section';
import TestimonialCarousel from './testimonial-carousel';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';

const CenteredSection = withProps({centered: true})(Section);
const GridItem = withProps({item: true})(Grid);
const StyledFavoriteIcon = styled(FavoriteIcon)({
  marginRight: theme.spacing.unit
});

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Informing voters</title>
        </Helmet>
        <Hero />
        <CenteredSection>
          <Grid container spacing={theme.spacing.unit * 5}>
            <GridItem xs={12} md={7} lg={8}>
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
            <GridItem xs={12} md={5} lg={4}>
              <TestimonialCarousel />
            </GridItem>
          </Grid>
        </CenteredSection>
        <Divider />
        <CenteredSection>
          <Button variant="extendedFab" color="primary">
            <StyledFavoriteIcon />
            Donate
          </Button>
        </CenteredSection>
        <Footer />
      </Fragment>
    );
  }
}

export default Home;
