import Grid from '@material-ui/core/Grid';
import Helmet from 'react-helmet';
import React, {Fragment} from 'react';
import Section from '../components/section';
import Typography from '@material-ui/core/Typography';
import scrollToTop from '../hocs/scroll-to-top';
import styled from 'react-emotion';
import team, {color} from '../assets/images/team.jpg';
import theme from '../theme';
import withProps from 'recompose/withProps';

const Hero = styled.div({backgroundColor: color});
const CenteredSection = withProps({centered: true})(Section);

const StyledImage = styled.img({
  width: '100%',
  marginBottom: theme.spacing.unit * 3
});

const Headline = styled(Typography)({
  maxWidth: theme.breakpoints.values.sm
});

const members = {
  'Trevor Blades':
    'Trevor is a web developer and designer. He spends his days at Planet Labs imaging the entire planet every day using a flock of tiny satellites. He drinks lots of coffee and loves playing Melee. He also created and maintains the addicting word game, Knoword.',
  'Marvin Sanchez':
    'As a designer at Prodigy, Marvin is currently on a mission to help kids around the world love math. He spent three years at Fanshawe College, obtaining both a diploma and post-graduate in Interactive Media. Marvin is better than you at video games and can play any Blink-182 song on his trusty air guitar.',
  'Miguel Barbosa':
    'Miguel is a film director, editor and producer. He creates music videos, documentaries and commercials.',
  'Matheson Murray':
    "Matheson is a graduate of Carleton University's faculty of Journalism and Communications and Sheridan College's New Media Journalism program. He worked as a Legislative Assistant on Parliament Hill in University and is now a freelance producer and filmmaker based in Toronto.",
  'Ben Miller':
    'Ben did his bachelors degree at the University of Victoria in Environmental Sciences and Business, and is now finishing his masters at Copenhagen Business School in the Organizational Innovation and Entrepreneurship Program, where he started the improvisation business training program. Ben has a lot of interests, one of those include riding vast distances on 4 person bikes.',
  'Joseph Homsy':
    'Joe has received two college certificates in digital media, and has since built a career in the field working at advertising agencies and outdoor clothing company, Sitka. Now, Joe is focused on growing his own company, Voyager Three, and producing films and digital campaigns.',
  'Sean Tanner':
    'Sean was born in Vancouver Canada and studied at Capilano University to become a Graphic Designer and Illustrator. Once out in the real world he spent the next 6 years working at Spring Advertising. He now lives in Melbourne Australia, freelancing, and spending as much time as possible relaxing, traveling and taking photos.',
  'Lorena Perez':
    'Lorena is a University of Toronto Graduate, communications professional and an M.A. candidate in Strategic Public Relations at the University of Southern California. She is passionate about environmental issues and animal rights, and is currently writing her thesis about plastic pollution in the ocean.',
  'David Clement':
    "David is an entrepreneur, non profit activist and political junkie. He has a Bachelor's degree in Political Science and a masters degree in International Relations from Wilfrid Laurier University. David previously worked as the research assistant to the Canada Research Chair in International Human Rights and is an unapologetic Taylor Swift fan."
};

const title = 'Our team';
const memberKeys = Object.keys(members);
const Team = () => (
  <Fragment>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Hero>
      <CenteredSection>
        <Typography gutterBottom variant="display3">
          {title}
        </Typography>
        <StyledImage src={team} />
        <Headline gutterBottom variant="headline">
          Pollenize is created by a collection of friends spread out across 6
          cities and 3 countries who are passionate about educating and creating
          beautiful, functional experiences. Read on to learn more about our
          crew.
        </Headline>
        <Typography variant="caption">
          Pictured (from left to right): Miguel, Ben, Matheson, Trevor, Marvin,
          and Joe
        </Typography>
      </CenteredSection>
    </Hero>
    <CenteredSection>
      <Grid container spacing={theme.spacing.unit * 5}>
        {memberKeys.map(key => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
            <Typography gutterBottom variant="display1">
              {key}
            </Typography>
            <Typography variant="subheading">{members[key]}</Typography>
          </Grid>
        ))}
      </Grid>
    </CenteredSection>
  </Fragment>
);

export default scrollToTop(Team);
