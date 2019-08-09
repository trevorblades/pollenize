import EditorTable from '../components/editor-table';
import Header from '../components/header';
import HeaderBase from '../components/header-base';
import LanguageMenu from '../components/language-menu';
import Layout from '../components/layout';
import LoginForm from '../components/login-form';
import React, {Fragment} from 'react';
import {Button, NoSsr} from '@material-ui/core';
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
            <HeaderBase title="Admin">
              <LanguageMenu />
              <Button
                onClick={logOut}
                variant="outlined"
                style={{marginLeft: 8}}
              >
                Log out
              </Button>
            </HeaderBase>
            <EditorTable />
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
