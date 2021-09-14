import Highlighter from 'react-highlight-words';
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

function VocabPopover({children}) {
  const keywords = useContext(KeywordContext);
  const {link, icon} = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const keyword = useMemo(() => {
    const keyword = keywords.find(
      keyword => keyword.word.toLowerCase() === children.toLowerCase()
    );

    if (!keyword.definition) {
      console.warn('keyword has no definition:', children);
      return null;
    }

    return keyword;
  }, [keywords, children]);

  if (!keyword) {
    return children;
  }

  return (
    <>
      <Link
        className={link}
        component="button"
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        {children}
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
        <Box
          p={2}
          maxWidth={300}
          css={{
            '& p': {
              margin: 0,
              '&:not(:last-child)': {
                marginBottom: 12
              }
            }
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            {keyword.word}
          </Typography>
          <Markdown>{keyword.definition}</Markdown>
        </Box>
      </Popover>
    </>
  );
}

VocabPopover.propTypes = {
  children: PropTypes.string.isRequired
};

function HighlightedText({value}) {
  const keywords = useContext(KeywordContext);
  const words = useMemo(
    () => keywords.map(keyword => keyword.word),
    [keywords]
  );
  return (
    <Highlighter
      searchWords={words}
      textToHighlight={value}
      highlightTag={VocabPopover}
      findChunks={({searchWords, textToHighlight}) =>
        searchWords.reduce((chunks, searchWord) => {
          const regex = new RegExp('\\b' + searchWord + '\\b', 'gi');

          let match;
          while ((match = regex.exec(textToHighlight))) {
            const start = match.index;
            const end = regex.lastIndex;
            // We do not return zero-length matches
            if (end > start) {
              chunks.push({start, end});
            }

            // Prevent browsers like Firefox from getting stuck in an infinite loop
            // See http://www.regexguru.com/2008/04/watch-out-for-zero-length-matches/
            if (match.index === regex.lastIndex) {
              regex.lastIndex++;
            }
          }

          return chunks;
        }, [])
      }
    />
  );
}

HighlightedText.propTypes = {
  value: PropTypes.string.isRequired
};

export const KeywordContext = createContext();

export default function StanceText({stance, sources, onSourceClick}) {
  return (
    <>
      <Markdown
        renderers={{text: HighlightedText}}
        disallowedTypes={['paragraph', 'link']}
        unwrapDisallowed
      >
        {stance.text}
      </Markdown>
      {stance.sources.map(source => {
        const number = sources.indexOf(source.url) + 1;
        return (
          <sup key={source.id}>
            [
            <Link
              color="inherit"
              href={`#source-${number}`}
              onClick={onSourceClick}
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
