import React from 'react';
import students from '../assets/images/students.jpg';
import {Box, Button, Grid, Typography} from '@material-ui/core';
import {ReactComponent as Civix} from '../assets/civix.svg';
import {FiX} from 'react-icons/fi';
import {ReactComponent as Logo} from '../assets/logo.svg';
import {SectionWrapper} from './common';
import {styled} from '@material-ui/styles';

const StyledImage = styled('img')(({theme}) => ({
  width: '100%',
  marginBottom: theme.spacing(1)
}));

export default function Future() {
  return (
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
            Please consider donating to either of our organizations if you want
            to support our work!
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
        <Grid item xs={12} sm={10} md={6}>
          <StyledImage
            alt="Students using Pollenize in class to learn about politics"
            src={students}
            width="100%"
            style={{display: 'block'}}
          />
          <Typography
            display="block"
            variant="caption"
            color="textSecondary"
            align="center"
          >
            Students learning about the election using Pollenize
          </Typography>
        </Grid>
      </Grid>
    </SectionWrapper>
  );
}
