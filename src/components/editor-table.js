import HeaderBase, {HEADER_HEIGHT} from './header-base';
import React, {Fragment} from 'react';
import {Button, Typography} from '@material-ui/core';
import {MultiGrid} from 'react-virtualized';
import {gql} from 'apollo-boost';
import {makeStyles} from '@material-ui/styles';
import {useQuery} from '@apollo/react-hooks';
import {useUser} from '../utils/user';
import {useWindowSize} from 'react-use';

const useStyles = makeStyles({
  grid: {
    outline: 'none'
  }
});

const GET_ELECTION = gql`
  query GetElection($id: ID!) {
    election(id: $id) {
      candidates {
        name
        hometown
        birthDate
        partyEn
        partyFr
        bioEn
        bioFr
      }
      topics {
        titleEn
        titleFr
        descriptionEn
        descriptionFr
      }
    }
  }
`;

function renderCellContent(election, columnIndex, rowIndex) {
  if (!columnIndex && !rowIndex) {
    return '';
  }

  if (!columnIndex) {
    const topic = election.topics[rowIndex - 1];
    return topic.titleEn;
  }

  if (!rowIndex) {
    const candidate = election.candidates[columnIndex - 1];
    return candidate.name;
  }

  return `${columnIndex},${rowIndex}`;
}

export default function EditorTable() {
  const {grid} = useStyles();
  const {user, logOut} = useUser();
  const {width, height} = useWindowSize();
  const {data, loading} = useQuery(GET_ELECTION, {
    variables: {
      id: 1
    }
  });

  return (
    <Fragment>
      <HeaderBase>
        <Typography variant="body2" style={{marginRight: 16}}>
          Hi {user.name.slice(0, user.name.indexOf(' '))} 👋
        </Typography>
        <Button onClick={logOut} variant="contained" color="primary">
          Log out
        </Button>
      </HeaderBase>
      {data && !loading && (
        <MultiGrid
          classNameTopLeftGrid={grid}
          classNameTopRightGrid={grid}
          classNameBottomLeftGrid={grid}
          classNameBottomRightGrid={grid}
          cellRenderer={({rowIndex, columnIndex, key, style}) => (
            <div key={key} style={style}>
              {renderCellContent(data.election, columnIndex, rowIndex)}
            </div>
          )}
          columnWidth={200}
          columnCount={data.election.candidates.length + 1}
          fixedColumnCount={1}
          rowHeight={40}
          rowCount={data.election.topics.length + 1}
          fixedRowCount={1}
          width={width}
          height={height - HEADER_HEIGHT}
        />
      )}
    </Fragment>
  );
}
