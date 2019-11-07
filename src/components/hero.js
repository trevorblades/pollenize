import React, {Fragment} from 'react';
import leaf, {ReactComponent as Leaf} from '../assets/leaf.svg';
import pattern from '../assets/pattern.svg';
import {Box, Typography, styled} from '@material-ui/core';
import {FaChevronRight} from 'react-icons/fa';
import {Fab} from 'gatsby-theme-material-ui';
import {SectionWrapper} from './common';
import {cover, size} from 'polished';

const Wrapper = styled(Box)({
  backgroundImage: `url(${pattern})`,
  backgroundPosition: 'center',
  backgroundSize: '700px'
});

const leafSize = 960;
const leafSizeSmall = 800;
const StyledLeaf = styled(Leaf)(({theme}) => {
  const wrapperOffset = theme.breakpoints.values.lg / 4;
  const paddingOffset = theme.spacing(8) / 2;
  return {
    ...size(leafSize),
    position: 'absolute',
    left: `calc(50% - ${wrapperOffset - paddingOffset}px)`,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    [theme.breakpoints.down('md')]: {
      left: `calc(25% + ${paddingOffset}px)`
    },
    [theme.breakpoints.down('sm')]: {
      ...size(leafSizeSmall),
      left: '50%'
    }
  };
});

function getMaskSize(size) {
  return `${size}px ${size}px`;
}

const Mask = styled('div')(({theme}) => ({
  ...cover(),
  maskImage: `url(${leaf})`,
  maskSize: getMaskSize(leafSize),
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  color: 'white',
  pointerEvents: 'none',
  userSelect: 'none',
  [theme.breakpoints.down('sm')]: {
    maskSize: getMaskSize(leafSizeSmall)
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
        We break down the candidates and their policies in a clear, organized
        way so that you can make an informed vote.
      </Typography>
    </Fragment>
  );
}

export default function Hero() {
  return (
    <Wrapper
      color="red"
      bgcolor="grey.200"
      position="relative"
      overflow="hidden"
    >
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
          <StyledLeaf fill="currentColor" />
          <Box position="relative">
            <Content />
            <Mask aria-hidden="true">
              <Content />
            </Mask>
            <Fab
              color="primary"
              variant="extended"
              to="/en/elections/canada-2019"
            >
              View election guide
              <Box component={FaChevronRight} ml={1} mr={-0.5} size={16} />
            </Fab>
          </Box>
        </Box>
      </SectionWrapper>
    </Wrapper>
  );
}
