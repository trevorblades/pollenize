import HeaderButton from './header-button';
import KeywordsDialog from './keywords-dialog';
import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import {CellMeasurer, CellMeasurerCache, MultiGrid} from 'react-virtualized';
import {HEADER_HEIGHT} from '../header-base';
import {makeStyles} from '@material-ui/core';
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

  const gridRef = useRef(null);
  const prevElection = usePrevious(props.election);
  useEffect(() => {
    if (props.election !== prevElection) {
      cache.clearAll();
      gridRef.current.forceUpdate(); // FIXME: this is a hack :)
    }
  }, [props.election, prevElection]);

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
          border: 1,
          borderTop: 0,
          borderLeft: 0,
          borderBottom: rowIndex < rowCount - 1 ? null : 0,
          borderRight: columnIndex < columnCount - 1 ? null : 0,
          // FIXME: refactor after https://github.com/mui-org/material-ui/issues/16995 is resolved
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
              <HeaderButton title="Keywords" {...boxProps}>
                {closeDialog => (
                  <KeywordsDialog
                    election={props.election}
                    onClose={closeDialog}
                  />
                )}
              </HeaderButton>
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
