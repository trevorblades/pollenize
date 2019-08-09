import PropTypes from 'prop-types';
import React from 'react';
import {Box, Typography} from '@material-ui/core';
import {CellMeasurer, CellMeasurerCache, MultiGrid} from 'react-virtualized';
import {HEADER_HEIGHT} from './header-base';
import {NO_OFFICIAL_STANCE} from '../utils';
import {makeStyles} from '@material-ui/styles';
import {useWindowSize} from 'react-use';

const cache = new CellMeasurerCache({
  defaultHeight: 100,
  fixedWidth: true
});

const useStyles = makeStyles({
  grid: {
    outline: 'none'
  }
});

function renderCellContent(election, columnIndex, rowIndex) {
  const topic = election.topics[rowIndex - 1];
  if (!columnIndex) {
    if (!rowIndex) {
      return '';
    }

    return topic.titleEn;
  }

  const candidate = election.candidates[columnIndex - 1];
  if (!rowIndex) {
    return candidate.name;
  }

  const [stance] = candidate.stances.filter(
    stance => stance.topicId === topic.id
  );

  return stance ? stance.textEn : NO_OFFICIAL_STANCE[0];
}

export default function ElectionTable(props) {
  const {grid} = useStyles();
  const {width, height} = useWindowSize();

  const rowCount = props.election.topics.length + 1;
  const columnCount = props.election.candidates.length + 1;
  return (
    <MultiGrid
      classNameTopLeftGrid={grid}
      classNameTopRightGrid={grid}
      classNameBottomLeftGrid={grid}
      classNameBottomRightGrid={grid}
      cellRenderer={({rowIndex, columnIndex, key, style, parent}) => (
        <CellMeasurer
          cache={cache}
          columnIndex={columnIndex}
          key={key}
          parent={parent}
          rowIndex={rowIndex}
        >
          <Box
            p={1}
            borderColor="divider"
            borderBottom={rowIndex < rowCount - 1 ? 1 : 0}
            borderRight={columnIndex < columnCount - 1 ? 1 : 0}
            style={style}
          >
            <Typography
              variant={rowIndex && columnIndex ? 'body2' : 'subtitle2'}
            >
              {renderCellContent(props.election, columnIndex, rowIndex)}
            </Typography>
          </Box>
        </CellMeasurer>
      )}
      columnWidth={({index}) => (index ? 300 : 200)}
      columnCount={columnCount}
      fixedColumnCount={1}
      rowHeight={cache.rowHeight}
      rowCount={rowCount}
      fixedRowCount={1}
      width={width}
      height={height - HEADER_HEIGHT}
    />
  );
}

ElectionTable.propTypes = {
  election: PropTypes.object.isRequired
};
