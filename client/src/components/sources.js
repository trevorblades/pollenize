import PropTypes from 'prop-types';
import React, {Fragment, useMemo, useState} from 'react';
import {Box, Typography, makeStyles, useTheme} from '@material-ui/core';
import {FooterContent} from './footer';
import {Link} from 'gatsby-theme-material-ui';
import {PageAnchor} from './common';
import {uniq} from 'lodash';
import {withProps} from 'recompose';

const useStyles = makeStyles(theme => ({
  list: {
    marginBottom: theme.spacing(8),
    columnCount: 3,
    columnGap: theme.spacing(5),
    wordBreak: 'break-word',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(5),
      columnCount: 2
    },
    [theme.breakpoints.down('sm')]: {
      columnCount: 1
    }
  }
}));

const ListItem = withProps({
  component: 'li',
  variant: 'body2',
  gutterBottom: true
})(Typography);

export function useSources(stances) {
  const [activeSource, setActiveSource] = useState(null);
  const sources = useMemo(
    () =>
      uniq(stances.flatMap(stance => stance.sources.map(source => source.url))),
    [stances]
  );

  return {
    sources,
    activeSource,
    handleSourceClick(event) {
      setActiveSource(event.target.textContent - 1);
    }
  };
}

export default function Sources(props) {
  const {list} = useStyles();
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
          {props.sources.length > 0 && (
            <Fragment>
              <Typography gutterBottom variant="h4">
                Sources
              </Typography>
              <ol className={list}>
                {props.sources.map((source, index) => (
                  <Fragment key={source}>
                    <PageAnchor name={`source-${index + 1}`} />
                    <ListItem
                      color={
                        props.activeIndex === index ? 'primary' : 'inherit'
                      }
                    >
                      <Link
                        color="inherit"
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source}
                      </Link>
                    </ListItem>
                  </Fragment>
                ))}
              </ol>
            </Fragment>
          )}
          {props.credits.length > 0 && (
            <Fragment>
              <Typography gutterBottom variant="h4">
                Credits
              </Typography>
              <ul className={list}>
                {props.credits.map(credit => (
                  <ListItem key={credit.id}>
                    {credit.name}, {credit.role}
                  </ListItem>
                ))}
              </ul>
            </Fragment>
          )}
          <FooterContent />
        </Box>
      </Box>
    </Fragment>
  );
}

Sources.propTypes = {
  credits: PropTypes.array.isRequired,
  sources: PropTypes.array.isRequired,
  activeIndex: PropTypes.number
};
