import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import React, {createContext, useContext, useMemo, useState} from 'react';
import {Box, Link, Popover, Typography, makeStyles} from '@material-ui/core';
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
  const keywords = useContext(KeywordContext);
  const {link, icon} = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const keyword = useMemo(() => {
    const keyword = keywords.find(
      keyword => keyword.word.toLowerCase() === word.toLowerCase()
    );

    if (!keyword?.definition) {
      keyword
        ? console.warn('keyword has no definition:', word)
        : console.error('keyword not found:', word);
      return null;
    }

    return keyword;
  }, [keywords, word]);

  if (!keyword) {
    return word;
  }

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
          <Typography variant="subtitle2" gutterBottom>
            {keyword.word}
          </Typography>
          {keyword.definition}
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
    <VocabPopover word={props.children[0]} {...props} />
  );
}

CustomAnchor.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string
};

const components = {
  a: CustomAnchor
};

export const KeywordContext = createContext();

export default function StanceText(props) {
  return (
    <>
      <Markdown
        disallowedElements={['p']}
        unwrapDisallowed
        components={components}
      >
        {props.stance.text}
      </Markdown>
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
    </>
  );
}

StanceText.propTypes = {
  stance: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  onSourceClick: PropTypes.func.isRequired
};
