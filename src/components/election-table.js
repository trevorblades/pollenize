import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Box, CardActionArea, Typography} from '@material-ui/core';
import {CellMeasurer, CellMeasurerCache, MultiGrid} from 'react-virtualized';
import {HEADER_HEIGHT} from './header-base';
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
      cellRenderer={({rowIndex, columnIndex, key, style, parent}) => {
        const isBody = rowIndex && columnIndex;
        const topic = props.election.topics[rowIndex - 1];
        const candidate = props.election.candidates[columnIndex - 1];
        return (
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
              {isBody ? (
                candidate.stances
                  .filter(stance => stance.topicId === topic.id)
                  .map(stance => (
                    <CardActionArea key={stance.id}>
                      <Box p={1}>
                        <Typography variant="body2">
                          {stance.textEn}
                          {!stance.sources.length && (
                            <Fragment>
                              {' '}
                              <Box component="span" color="error.main">
                                [needs source]
                              </Box>
                            </Fragment>
                          )}
                        </Typography>
                      </Box>
                    </CardActionArea>
                  ))
              ) : (
                <Typography variant="subtitle2">
                  {columnIndex ? candidate.name : topic && topic.titleEn}
                </Typography>
              )}
            </Box>
          </CellMeasurer>
        );
      }}
      columnWidth={({index}) => (index ? 400 : 200)}
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
