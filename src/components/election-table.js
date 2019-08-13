import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import {Box} from '@material-ui/core';
import {CellMeasurer, CellMeasurerCache, MultiGrid} from 'react-virtualized';
import {HEADER_HEIGHT} from './header-base';
import {makeStyles} from '@material-ui/styles';
import {useLanguage} from '../utils/language';
import {usePrevious, useWindowSize} from 'react-use';

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
  const {language} = useLanguage();

  const gridRef = useRef(null);
  const prevElection = usePrevious(props.election);
  const prevLanguage = usePrevious(language);
  useEffect(() => {
    if (props.election !== prevElection || language !== prevLanguage) {
      cache.clearAll();
      gridRef.current.forceUpdate();
    }
  }, [props.election, prevElection, language, prevLanguage]);

  const rowCount = props.election.topics.length + 1;
  const columnCount = props.election.candidates.length + 1;
  return (
    <MultiGrid
      ref={gridRef}
      classNameTopLeftGrid={grid}
      classNameTopRightGrid={grid}
      classNameBottomLeftGrid={grid}
      classNameBottomRightGrid={grid}
      cellRenderer={({rowIndex, columnIndex, key, style, parent}) => {
        const isBody = rowIndex && columnIndex;
        const topic = props.election.topics[rowIndex - 1];
        const candidate = props.election.candidates[columnIndex - 1];
        const boxProps = {
          borderColor: 'divider',
          borderBottom: rowIndex < rowCount - 1 ? 1 : 0,
          borderRight: columnIndex < columnCount - 1 ? 1 : 0,
          style
        };

        const options = {
          candidate,
          topic,
          boxProps
        };

        return (
          <CellMeasurer
            cache={cache}
            columnIndex={columnIndex}
            key={key}
            parent={parent}
            rowIndex={rowIndex}
          >
            {isBody ? (
              props.renderStances({
                ...options,
                stances: candidate.stances.filter(
                  stance => stance.topicId === topic.id
                )
              })
            ) : columnIndex ? (
              props.renderCandidate(options)
            ) : topic ? (
              props.renderTopic(options)
            ) : (
              <Box {...boxProps} />
            )}
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
  election: PropTypes.object.isRequired,
  renderStances: PropTypes.func.isRequired,
  renderCandidate: PropTypes.func.isRequired,
  renderTopic: PropTypes.func.isRequired
};
