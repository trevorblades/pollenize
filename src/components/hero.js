import React, {Fragment} from 'react';
import logo, {ReactComponent as Logo} from '../assets/logo.svg';
import {Box, Fab, Typography} from '@material-ui/core';
import {Link} from 'gatsby';
import {cover, size} from 'polished';
import {styled, useTheme} from '@material-ui/styles';

const Wrapper = styled('div')(({theme}) => ({
  backgroundColor: theme.palette.grey[200],
  overflow: 'hidden',
  position: 'relative'
}));

const paddingX = 8;
const StyledLogo = styled(Logo)(({theme}) => {
  const wrapperOffset = theme.breakpoints.values.lg / 4;
  const paddingOffset = theme.spacing(paddingX) / 2;
  return {
    ...size(960),
    position: 'absolute',
    left: `calc(50% - ${wrapperOffset - paddingOffset}px)`,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    [theme.breakpoints.down('md')]: {
      left: `calc(25% + ${paddingOffset}px)`
    },
    [theme.breakpoints.down('sm')]: {
      ...size(800),
      left: '50%'
    }
  };
});

const InnerWrapper = styled('div')({
  position: 'relative'
});

const Mask = styled('div')(({theme}) => ({
  ...cover(),
  maskImage: `url(${logo})`,
  maskSize: 960,
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  color: 'white',
  pointerEvents: 'none',
  userSelect: 'none',
  [theme.breakpoints.down('sm')]: {
    maskSize: 800
  }
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

export default function Hero() {
  const {breakpoints, palette} = useTheme();
  return (
    <Wrapper>
      <Box maxWidth={breakpoints.values.lg} mx="auto" px={paddingX} py={12}>
        <Box
          width={{
            sm: 1,
            md: 1 / 2
          }}
        >
          <StyledLogo fill={palette.text.primary} />
          <InnerWrapper>
            <Content />
            <Mask aria-hidden="true">
              <Content />
            </Mask>
            <Fab
              variant="extended"
              component={Link}
              to="/elections/canada-2019"
              color="secondary"
            >
              View election guide
            </Fab>
          </InnerWrapper>
        </Box>
      </Box>
    </Wrapper>
  );
}
