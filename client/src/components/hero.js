import React from 'react';
import pattern from '../assets/pattern.svg';
import {Box, Typography, styled} from '@material-ui/core';
import {Fab} from 'gatsby-theme-material-ui';
import {ReactComponent as Leaf} from '../assets/leaf.svg';
import {SectionWrapper} from './common';
import {size} from 'polished';

const Wrapper = styled(Box)({
  backgroundImage: `url(${pattern})`,
  backgroundPosition: 'center',
  backgroundSize: '700px'
});

const StyledLeaf = styled(Leaf)(({theme}) => {
  const wrapperOffset = theme.breakpoints.values.lg / 4;
  const paddingOffset = theme.spacing(8) / 2;
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

export default function Hero() {
  return (
    <Wrapper position="relative" overflow="hidden">
      <SectionWrapper
        py={{
          xs: 8,
          sm: 10,
          md: 12
        }}
      >
        <Box
          width={{
            sm: 1,
            md: 1 / 2
          }}
        >
          <StyledLeaf />
          <Box position="relative">
            <Typography variant="overline" style={{color: '#ff3a1a'}}>
              Your guide to the
            </Typography>
            <Typography gutterBottom variant="h2">
              2021 Canadian Federal Election
            </Typography>
            <Typography paragraph variant="h6">
              We break down the candidates and their policies in a clear,
              organized way so that you can make an informed vote.
            </Typography>
            <Fab
              color="primary"
              variant="extended"
              to="/en/elections/canada-2021"
            >
              View election guide 🇨🇦
            </Fab>
          </Box>
        </Box>
      </SectionWrapper>
    </Wrapper>
  );
}
