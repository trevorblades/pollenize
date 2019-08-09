import Header from '../components/header';
import HeaderBase from '../components/header-base';
import Layout from '../components/layout';
import LoginForm from '../components/login-form';
import React, {Fragment} from 'react';
import {Button, NoSsr, Typography} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {useUser} from '../utils/user';

export default function Admin() {
  const {user, setToken, logOut} = useUser();
  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Admin</title>
      </Helmet>
      <NoSsr>
        {user ? (
          <Fragment>
            <HeaderBase>
              <Typography variant="body2" style={{marginRight: 16}}>
                Hi {user.name.slice(0, user.name.indexOf(' '))} 👋
              </Typography>
              <Button onClick={logOut} variant="contained" color="primary">
                Log out
              </Button>
            </HeaderBase>
          </Fragment>
        ) : (
          <Fragment>
            <Header />
            <LoginForm setToken={setToken} />
          </Fragment>
        )}
      </NoSsr>
    </Layout>
  );
}
