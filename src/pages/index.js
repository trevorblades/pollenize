import About from '../components/about';
import Footer from '../components/footer';
import Header from '../components/header';
import Hero from '../components/hero';
import Layout from '../components/layout';
import Quotes from '../components/quotes';
import React from 'react';
import students from '../assets/images/students.jpg';
import {Box, Button, Divider, Grid, Typography} from '@material-ui/core';
import {ReactComponent as Civix} from '../assets/civix.svg';
import {FiX} from 'react-icons/fi';
import {Helmet} from 'react-helmet';
import {ReactComponent as Logo} from '../assets/logo.svg';
import {SectionWrapper} from '../components/common';

export default function Index() {
  return (
    <Layout>
      <Helmet>
        <title>Informing voters</title>
      </Helmet>
      <Header />
      <Hero />
      <About />
      <Quotes />
      <SectionWrapper py={10}>
        <Grid container spacing={7}>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom variant="h4">
              For a brighter political future
            </Typography>
            <Typography paragraph>
              Pollenize is a registered non-profit. We&apos;re an all-volunteer
              team on a mission to make elections easier to understand and
              encourage people to participate in democracy.
            </Typography>
            <Box mt={5} mb={3} display="flex" alignItems="center">
              <Logo height={36} fill="currentColor" />
              <Box mx={2} color="text.secondary">
                <FiX size={20} display="block" />
              </Box>
              <Civix height={24} />
            </Box>
            <Typography paragraph>
              With the help of our partner <a href="https://civix.ca">CIVIX</a>,
              we&apos;ve brought engaging, approachable civic education tools to
              thousands of classrooms across Canada, with many more to come.
            </Typography>
            <Typography paragraph>
              Please consider donating to either of our organizations if you
              want to support our work!
            </Typography>
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_blank"
            >
              <input name="cmd" type="hidden" value="_s-xclick" />
              <input
                name="hosted_button_id"
                type="hidden"
                value="9B2B2V2TDLPEE"
              />
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
              >
                Make a donation
              </Button>
              <img
                width={1}
                height={1}
                border={0}
                src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
              />
            </form>
          </Grid>
          <Grid item xs={12} sm={9} md={6}>
            <img
              alt="Students using Pollenize in class to learn about politics"
              src={students}
              width="100%"
              style={{display: 'block'}}
            />
          </Grid>
        </Grid>
      </SectionWrapper>
      <Divider />
      <Footer />
    </Layout>
  );
}
