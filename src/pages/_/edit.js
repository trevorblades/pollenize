import EditorTable from '../../components/editor-table';
import Header from '../../components/header';
import HeaderBase from '../../components/header-base';
import Layout from '../../components/layout';
import LoginForm from '../../components/login-form';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Button, NoSsr} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {parse} from 'query-string';
import {useUser} from '../../utils/user';

export default function Edit(props) {
  const {user, setToken} = useUser();

  function logOut() {
    setToken('');
  }

  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Editor</title>
      </Helmet>
      <NoSsr>
        {user ? (
          <Fragment>
            <HeaderBase>
              <Button
                disabled={!user}
                onClick={logOut}
                variant="outlined"
                style={{marginLeft: 8}}
              >
                Log out
              </Button>
            </HeaderBase>
            <EditorTable {...parse(props.location.search)} />
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

Edit.propTypes = {
  location: PropTypes.object.isRequired
};
