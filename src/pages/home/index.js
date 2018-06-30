import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Helmet from 'react-helmet';
import Hero from './hero';
import Paper from '@material-ui/core/Paper';
import React, {Component, Fragment} from 'react';
import Section from './section';
import Typography from '@material-ui/core/Typography';
import justin from '../../assets/images/justin.jpg';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';

const GridItem = withProps({item: true})(Grid);

const Testimonials = styled(Paper)({
  padding: theme.spacing.unit * 3
});

const Attribution = styled.div({
  display: 'flex',
  alignItems: 'center'
});

const AttributionText = styled.div({
  marginLeft: theme.spacing.unit
});

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
              <Testimonials>
                <Typography paragraph variant="subheading">
                  Pollenize is doing great work getting young people engaged &
                  letting everyone know where the parties stand.
                </Typography>
                <Attribution>
                  <Avatar src={justin} />
                  <AttributionText>
                    <Typography variant="body2">Justin Trudeau</Typography>
                    <Typography variant="caption">
                      Prime Minister of Canada
                    </Typography>
                  </AttributionText>
                </Attribution>
              </Testimonials>
            </GridItem>
          </Grid>
        </Section>
      </Fragment>
    );
  }
}

export default Home;
