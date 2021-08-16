import EditorTable from '../../components/editor-table';
import Header from '../../components/header';
import HeaderBase from '../../components/header-base';
import Layout from '../../components/layout';
import LoginForm from '../../components/login-form';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import decode from 'jwt-decode';
import {Button, NoSsr} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {parse} from 'query-string';
import {useLocalStorage} from 'react-use';

export default function Edit(props) {
  const [token, setToken] = useLocalStorage('token', null, true);

  let user;
  if (token) {
    try {
      user = decode(token);
    } catch (error) {
      // let errors pass
    }
  }
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
