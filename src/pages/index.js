import Footer from '../components/footer';
import Header from '../components/header';
import Hero from '../components/hero';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React from 'react';
import clouds from '../assets/images/clouds.jpg';
import {Box, Grid, Typography} from '@material-ui/core';
import {SectionWrapper} from '../components/common';
import {styled} from '@material-ui/styles';

const QuotesWrapper = styled('div')({
  backgroundColor: '#7ebacf',
  backgroundImage: `url(${clouds})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
});

function Quote(props) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box component="blockquote" m={0} mt={4} textAlign="center">
        <Typography paragraph>&ldquo;{props.children}&rdquo;</Typography>
        <Typography component="cite" variant="subtitle2">
          &mdash;{props.cite}
        </Typography>
      </Box>
    </Grid>
  );
}

Quote.propTypes = {
  cite: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default function Index() {
  return (
    <Layout>
      <Header />
      <Hero />
      <SectionWrapper py={10}>
        <Typography gutterBottom variant="h3">
          Informing voters
        </Typography>
        <Box
          maxWidth={{
            xs: 1,
            md: 2 / 3
          }}
        >
          <Typography paragraph>
            Pollenize is a nonpartisan, apolitical non-profit organization
            seeking to provide voters with the most accurate election
            information possible. We aim to make a positive impact on voter
            turnout and help spark political discussion in communities around
            the world.
          </Typography>
          <Typography paragraph>
            People talk about how important it is to vote, but the information
            necessary to make a confident decision is often sparse, unclear, and
            riddled with political rhetoric and jargon. Pollenize cuts through
            the noise and bring you the most clear, to-the-point information
            about topics that really matter.
          </Typography>
        </Box>
      </SectionWrapper>
      <QuotesWrapper>
        <SectionWrapper py={10}>
          <Typography align="center" variant="h4">
            We&apos;re creating a buzz 🐝
          </Typography>
          <Grid container spacing={8} justify="center">
            <Quote cite="Matt Galloway, CBC">
              You&apos;d be forgiven if you can&apos;t remember where each
              [candidate] stands on the big issues. Pollenize is a site that is
              trying to make it easier for voters.
            </Quote>
            <Quote cite="Leena Latafat, Global News">
              Sifting through a pool of political information on the internet
              can be overwhelming. But now, there&apos;s an app for that.
            </Quote>
            <Quote cite="Patricia D'Cunha, CityNews Toronto">
              The Pollenize app has presented the candidates&apos; platforms in
              a readable, friendly, and visually appealing format.
            </Quote>
          </Grid>
        </SectionWrapper>
      </QuotesWrapper>
      <Footer />
    </Layout>
  );
}
