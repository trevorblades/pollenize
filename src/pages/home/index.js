import Divider from '@material-ui/core/Divider';
import DonateButton from './donate-button';
import Grid from '@material-ui/core/Grid';
import Helmet from 'react-helmet';
import Hero from './hero';
import React, {Fragment} from 'react';
import ScrollableAnchor from 'react-scrollable-anchor';
import Section from '../../components/section';
import TestimonialCarousel from './testimonial-carousel';
import Typography from '@material-ui/core/Typography';
import students from '../../assets/images/students.jpg';
import scrollToTop from '../../hocs/scroll-to-top';
import theme from '../../theme';
import withProps from 'recompose/withProps';

const CenteredSection = withProps({centered: true})(Section);
const GridItem = withProps({item: true})(Grid);
const GridContainer = withProps({
  container: true,
  spacing: theme.spacing.unit * 5
})(Grid);

const Home = () => (
  <Fragment>
    <Helmet>
      <title>Informing voters</title>
    </Helmet>
    <Hero />
    <CenteredSection>
      <GridContainer>
        <GridItem xs={12} md={7} lg={8}>
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
            riddled with political rhetoric and jargon. Pollenize cuts through
            the noise and bring you the most clear, to-the-point information
            about topics that really matter.
          </Typography>
        </GridItem>
        <GridItem xs={12} md={5} lg={4}>
          <TestimonialCarousel />
        </GridItem>
      </GridContainer>
    </CenteredSection>
    <Divider />
    <ScrollableAnchor id="donate">
      <Fragment>
        <CenteredSection>
          <GridContainer alignItems="center">
            <GridItem xs={4}>
              <img src={students} style={{width: '100%'}} />
            </GridItem>
            <GridItem xs={8} style={{textAlign: 'center'}}>
              <Typography gutterBottom variant="display1">
                For a politically-engaged future
              </Typography>
              <Typography paragraph variant="subheading">
                Pollenize is a registered non-profit. We&apos;re an
                all-volunteer team on a mission to make elections easier to
                understand and encourage people to participate in democracy.
              </Typography>
              <Typography paragraph variant="subheading">
                Your donation will help us spread the word about the tools that
                we build, produce other projects, and engage the voting public
                in other ways. If you like what we&apos;re doing, we&apos;d be
                very grateful if you contributed any amount that you think is
                fair.
              </Typography>
              <DonateButton />
            </GridItem>
          </GridContainer>
        </CenteredSection>
      </Fragment>
    </ScrollableAnchor>
  </Fragment>
);

export default scrollToTop(Home);
