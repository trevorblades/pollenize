import PropTypes from 'prop-types';
import React from 'react';
import clouds from '../assets/images/clouds.jpg';
import {Box, Grid, Typography, styled} from '@material-ui/core';
import {SectionWrapper} from './common';

const Wrapper = styled('div')({
  backgroundColor: '#84d9f8',
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

export default function Quotes() {
  return (
    <Wrapper>
      <SectionWrapper
        py={{
          xs: 6,
          sm: 8,
          md: 10
        }}
      >
        <Typography align="center" variant="h4">
          We&apos;re creating a buzz 🐝
        </Typography>
        <Grid container spacing={8} alignItems="center" justify="center">
          <Quote cite="Matt Galloway, CBC">
            You&apos;d be forgiven if you can&apos;t remember where each
            [candidate] stands on the big issues. Pollenize is a site that is
            trying to make it easier for voters.
          </Quote>
          <Quote cite="Leena Latafat, Global News">
            Sifting through a pool of political information on the internet can
            be overwhelming. But now, there&apos;s an app for that.
          </Quote>
          <Quote cite="Patricia D'Cunha, CityNews Toronto">
            The Pollenize app has presented the candidates&apos; platforms in a
            readable, friendly, and visually appealing format.
          </Quote>
        </Grid>
      </SectionWrapper>
    </Wrapper>
  );
}
