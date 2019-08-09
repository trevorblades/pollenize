import Header from '../components/header';
import HeaderBase from '../components/header-base';
import Layout from '../components/layout';
import LoginForm from '../components/login-form';
import React, {Fragment} from 'react';
import {Button, NoSsr} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {useUser} from '../utils/user';

export default function Admin() {
  const {token, setToken, logOut} = useUser();
  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Admin</title>
      </Helmet>
      <NoSsr>
        {token ? (
          <Fragment>
            <HeaderBase>
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
