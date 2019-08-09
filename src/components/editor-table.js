import HeaderBase from './header-base';
import React, {Fragment} from 'react';
import {Button, Typography} from '@material-ui/core';
import {FullScreenWrapper} from './common';
import {useUser} from '../utils/user';

export default function EditorTable() {
  const {user, logOut} = useUser();
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
      <FullScreenWrapper>hey</FullScreenWrapper>
    </Fragment>
  );
}
