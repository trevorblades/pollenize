import Header from '../components/header';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React from 'react';
import team from '../assets/images/team.jpg';
import {Box, Grid, Link as MuiLink, Typography} from '@material-ui/core';
import {FaTwitter} from 'react-icons/fa';
import {SectionWrapper} from '../components/common';

function TeamMember(props) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography gutterBottom variant="h4">
        {props.name}
      </Typography>
      {props.twitter && (
        <Box mb={1} display="flex" alignItems="center">
          <FaTwitter size={16} style={{marginRight: 8}} />
          <MuiLink
            href={`https://twitter.com/${props.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            variant="subtitle2"
          >
            @{props.twitter}
          </MuiLink>
        </Box>
      )}
      <Typography>{props.bio}</Typography>
    </Grid>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  twitter: PropTypes.string,
  bio: PropTypes.string.isRequired
};

export default function Team() {
  return (
    <Layout>
      <Header />
      <Box
        bgcolor="darkgrey"
        style={{
          backgroundImage:
            'linear-gradient(to top right, seashell, transparent)'
        }}
      >
        <SectionWrapper py={10}>
          <Typography gutterBottom variant="h2">
            Our team
          </Typography>
          <Box
            ml={-8}
            mb={3}
            mr={{
              xs: -8,
              md: 8
            }}
          >
            <img width="100%" src={team} />
          </Box>
          <Box
            width={{
              xs: 1,
              md: 2 / 3
            }}
          >
            <Typography paragraph variant="h6">
              Pollenize is created by a group of friends across canada who are
              passionate about educating and creating enjoyable, functional
              experiences. Continue reading to learn more about our crew...
            </Typography>
            <Typography display="block" variant="caption" color="textSecondary">
              Pictured (from left to right): Miguel, Ben, Matheson, Trevor,
              Marvin, and Joe
            </Typography>
          </Box>
        </SectionWrapper>
      </Box>
      <SectionWrapper>
        <Grid container spacing={5}>
          <TeamMember
            name="Trevor Blades"
            twitter="trevorblades"
            bio="Trevor is a web developer based in Burnaby, BC. He web-develops everything from word games to productivity tools, and enjoys working on open source projects."
          />
          <TeamMember
            name="Miguel Barbosa"
            twitter="yeahfilms"
            bio="Miguel is an award-winning film director, editor and producer. He creates music videos, documentaries and commercials."
          />
          <TeamMember
            name="Marvin Sanchez"
            twitter="marvinsanchez"
            bio="As a designer at Prodigy, Marvin is currently on a mission to help kids around the world love math. Marvin is better than you at video games and can play any Blink-182 song on his trusty air guitar."
          />
          <TeamMember
            name="Matheson Murray"
            twitter="mathesonmurray"
            bio="Matheson is a graduate of Carleton University's faculty of Journalism and Communications and Sheridan College's New Media Journalism program. He worked as a Legislative Assistant on Parliament Hill in University and is now a freelance producer and filmmaker based in Toronto."
          />
          <TeamMember
            name="Ben Miller"
            twitter="mastermill"
            bio="Ben did his bachelors degree at the University of Victoria in Environmental Sciences and Business, and is now finishing his masters at Copenhagen Business School in the Organizational Innovation and Entrepreneurship Program, where he started the improvisation business training program. Ben has a lot of interests, one of those include riding vast distances on 4 person bikes."
          />
          <TeamMember
            name="Joseph Homsy"
            bio="Joe has received two college certificates in digital media, and has since built a career in the field working at advertising agencies and outdoor clothing company, Sitka. Now, Joe is focused on growing his own company, Voyager Three, and producing films and digital campaigns."
          />
          <TeamMember
            name="Sean Tanner"
            twitter="shontanner"
            bio="Sean was born in Vancouver Canada and studied at Capilano University to become a Graphic Designer and Illustrator. Once out in the real world he spent the next 6 years working at Spring Advertising. He now lives in Melbourne Australia, freelancing, and spending as much time as possible relaxing, traveling and taking photos."
          />
        </Grid>
      </SectionWrapper>
    </Layout>
  );
}
