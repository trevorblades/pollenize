import Layout from '../components/layout';
import React, {Fragment} from 'react';
import logo, {ReactComponent as Logo} from '../assets/logo.svg';
import {AppBar, Box, Fab, Toolbar, Typography} from '@material-ui/core';
import {Link} from 'gatsby';
import {cover} from 'polished';
import {styled} from '@material-ui/styles';

const heroStyles = {
  backgroundImage: `url(${logo})`,
  backgroundSize: 800,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left'
};

const heroPaddingX = 8;
const Hero = styled(Box)(heroStyles);

const ContentWrapper = styled('div')({
  position: 'relative'
});

const Mask = styled('div')(({theme}) => ({
  ...cover(),
  color: 'white',
  maskImage: heroStyles.backgroundImage,
  maskSize: heroStyles.backgroundSize,
  maskRepeat: heroStyles.backgroundRepeat,
  maskPosition: `-${theme.spacing(heroPaddingX)}px 50%`,
  pointerEvents: 'none',
  userSelect: 'none'
}));

function Content() {
  return (
    <Fragment>
      <Typography variant="overline">Your guide to the</Typography>
      <Typography gutterBottom variant="h2">
        2019 Canadian federal election
      </Typography>
      <Typography paragraph variant="h6">
        We break down the candidates and their policies so that you can make a
        confident and informed vote.
      </Typography>
    </Fragment>
  );
}

export default function Index() {
  return (
    <Layout>
      <AppBar elevation={0} color="inherit" position="sticky">
        <Toolbar>
          <Box width="100%" maxWidth={1400} mx="auto">
            <Logo height={36} />
          </Box>
        </Toolbar>
      </AppBar>
      <Hero maxWidth={1400} mx="auto" px={heroPaddingX} py={12}>
        <Box width="50%">
          <ContentWrapper>
            <Content />
            <Mask aria-hidden="true">
              <Content />
            </Mask>
            <Fab
              variant="extended"
              component={Link}
              to="/elections/canada-2019"
            >
              View guide
            </Fab>
          </ContentWrapper>
        </Box>
      </Hero>
    </Layout>
  );
}
