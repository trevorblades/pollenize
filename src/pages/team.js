import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React from 'react';
import team from '../assets/images/team.jpg';
import {
  Box,
  Divider,
  Grid,
  Link as MuiLink,
  Typography
} from '@material-ui/core';
import {FaInstagram, FaTwitter} from 'react-icons/fa';
import {Helmet} from 'react-helmet';
import {SectionWrapper} from '../components/common';
import {makeStyles} from '@material-ui/styles';
import {size} from 'polished';

const useStyles = makeStyles({
  social: {
    ...size(18),
    marginRight: 8
  }
});

function TeamMember(props) {
  const {social} = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography gutterBottom variant="h4">
        {props.name}
      </Typography>
      {props.handle && (
        <Box mb={1} display="flex" alignItems="center">
          {props.social === 'instagram' ? (
            <FaInstagram className={social} />
          ) : (
            <FaTwitter fill="#1da1f2" className={social} />
          )}
          <MuiLink
            href={`https://${props.social}.com/${props.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            variant="subtitle2"
          >
            @{props.handle}
          </MuiLink>
        </Box>
      )}
      <Typography>{props.bio}</Typography>
    </Grid>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  handle: PropTypes.string,
  social: PropTypes.string,
  bio: PropTypes.string.isRequired
};

TeamMember.defaultProps = {
  social: 'twitter'
};

export default function Team() {
  return (
    <Layout>
      <Helmet>
        <title>Our team</title>
      </Helmet>
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
            handle="trevorblades"
            bio="Trevor is a web developer based in Burnaby, BC who web-develops everything from word games to productivity tools. He enjoys skateboarding and open source software."
          />
          <TeamMember
            name="Miguel Barbosa"
            handle="yeahfilms"
            bio="Miguel is an award-winning film director, editor and producer. He creates music videos, documentaries and commercials."
          />
          <TeamMember
            name="Marvin Sanchez"
            handle="marvinsanchez"
            bio="As a designer at Prodigy, Marvin is currently on a mission to help kids around the world love math. Marvin is better than you at video games and can play any Blink-182 song on his trusty air guitar."
          />
          <TeamMember
            name="Matheson Murray"
            handle="mathesonmurray"
            bio="Matheson is a top ten finisher in the 2005 Halton Region Cross Country meet and a producer working in advertising."
          />
          <TeamMember
            name="Ben Miller"
            social="instagram"
            handle="mastermill"
            bio="Ben is founder of WIRTH Hats, a clothing brand that works to break down barriers around mental health. Outside of WIRTH, Ben has led leadership and team development workshops in a variety of countries and companies, including Canada, US, Germany and Denmark."
          />
          <TeamMember
            name="Joseph Homsy"
            social="instagram"
            handle="jooomsy"
            bio="Joe has received two college certificates in digital media, and has since built a career in the field working at advertising agencies and outdoor clothing company, Sitka. Now, Joe is focused on growing his own company, Voyager Three, and producing films and digital campaigns."
          />
          <TeamMember
            name="Sean Tanner"
            handle="shon"
            social="instagram"
            bio="Sean was born in Vancouver Canada and studied at Capilano University to become a Graphic Designer and Illustrator. Once out in the real world he spent the next 6 years working at Spring Advertising. He now lives in Melbourne Australia, freelancing, and spending as much time as possible relaxing, traveling and taking photos."
          />
        </Grid>
      </SectionWrapper>
      <Divider />
      <Footer />
    </Layout>
  );
}
