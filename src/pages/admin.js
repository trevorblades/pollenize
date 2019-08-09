import Layout from '../components/layout';
import LoginForm from '../components/login-form';
import React from 'react';
import {EditorTable} from '../components/editor-table';
import {Helmet} from 'react-helmet';
import {NoSsr} from '@material-ui/core';
import {useUser} from '../utils/user';

export default function Admin() {
  const {user} = useUser();
  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Admin</title>
      </Helmet>
      <NoSsr>{user ? <EditorTable /> : <LoginForm />}</NoSsr>
    </Layout>
  );
}
