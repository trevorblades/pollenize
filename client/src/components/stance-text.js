import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import {Box, Link, Popover, makeStyles} from '@material-ui/core';
import {FaQuestionCircle} from 'react-icons/fa';
import {size} from 'polished';

const useStyles = makeStyles({
  link: {
    display: 'inline-grid',
    gridTemplateColumns: 'auto auto',
    gridGap: 4,
    alignItems: 'center',
    font: 'inherit',
    verticalAlign: 'baseline'
  },
  icon: size('0.75em')
});

function VocabPopover({word}) {
  const {link, icon} = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <Link
        className={link}
        component="button"
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        {word}
        <FaQuestionCircle className={icon} />
      </Link>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Box p={2} maxWidth={300}>
          <strong>noun.</strong> a procedure intended to establish the quality,
          performance, or reliability of something, especially before it is
          taken into widespread use.
        </Box>
      </Popover>
    </>
  );
}

VocabPopover.propTypes = {
  word: PropTypes.string.isRequired
};

function CustomAnchor(props) {
  return props.href ? (
    <a {...props} />
  ) : (
    <VocabPopover word={props.children[0]} />
  );
}

CustomAnchor.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string
};

const components = {
  a: CustomAnchor
};

export default function StanceText(props) {
  return (
    <Fragment>
      <Markdown components={components}>{props.stance.text}</Markdown>
      {props.stance.sources.map(source => {
        const number = props.sources.indexOf(source.url) + 1;
        return (
          <sup key={source.id}>
            [
            <Link
              color="inherit"
              href={`#source-${number}`}
              onClick={props.onSourceClick}
            >
              {number}
            </Link>
            ]
          </sup>
        );
      })}
    </Fragment>
  );
}

StanceText.propTypes = {
  stance: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  onSourceClick: PropTypes.func.isRequired
};
