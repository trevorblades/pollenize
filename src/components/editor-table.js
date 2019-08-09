import HeaderBase, {HEADER_HEIGHT} from './header-base';
import React, {Fragment} from 'react';
import {Button, Typography} from '@material-ui/core';
import {MultiGrid} from 'react-virtualized';
import {useUser} from '../utils/user';
import {useWindowSize} from 'react-use';

export default function EditorTable() {
  const {user, logOut} = useUser();
  const {width, height} = useWindowSize();
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
      <MultiGrid
        cellRenderer={({rowIndex, columnIndex, key, style}) => (
          <div key={key} style={style}>
            {rowIndex}/{columnIndex}
          </div>
        )}
        columnCount={10}
        columnWidth={100}
        rowCount={10}
        rowHeight={32}
        width={width}
        height={height - HEADER_HEIGHT}
      />
    </Fragment>
  );
}
