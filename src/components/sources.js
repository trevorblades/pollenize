import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Box, Link as MuiLink, Typography} from '@material-ui/core';
import {Colophon} from './footer';
import {PageAnchor} from './common';
import {styled, useTheme} from '@material-ui/styles';

const StyledList = styled('ol')(({theme}) => ({
  marginBottom: theme.spacing(4),
  columnCount: 3,
  columnGap: theme.spacing(5),
  wordBreak: 'break-word',
  [theme.breakpoints.down('md')]: {
    columnCount: 2
  },
  [theme.breakpoints.down('sm')]: {
    columnCount: 1
  }
}));

export default function Sources(props) {
  const {breakpoints} = useTheme();
  return (
    <Fragment>
      <PageAnchor name="sources" />
      <Box bgcolor="grey.200" component="footer">
        <Box
          maxWidth={breakpoints.values.lg}
          mx="auto"
          px={{
            xs: 5,
            lg: 8
          }}
          py={{
            xs: 7,
            lg: 10
          }}
          color="text.secondary"
        >
          <Typography gutterBottom variant="h4">
            Sources
          </Typography>
          <StyledList>
            {props.sources.map((source, index) => (
              <Fragment key={source}>
                <PageAnchor name={`source-${index + 1}`} />
                <Typography
                  gutterBottom
                  color={props.activeIndex === index ? 'primary' : 'inherit'}
                  component="li"
                  variant="body2"
                >
                  <MuiLink
                    color="inherit"
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source}
                  </MuiLink>
                </Typography>
              </Fragment>
            ))}
          </StyledList>
          <Typography>
            <Colophon />
          </Typography>
        </Box>
      </Box>
    </Fragment>
  );
}

Sources.propTypes = {
  sources: PropTypes.array.isRequired,
  activeIndex: PropTypes.number
};
