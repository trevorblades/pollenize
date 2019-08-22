import EditorTable from '../../components/editor-table';
import Header from '../../components/header';
import HeaderBase from '../../components/header-base';
import Layout from '../../components/layout';
import LoginForm from '../../components/login-form';
import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import {Button, NoSsr} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {LanguageButtonBase} from '../../components/language-menu';
import {LanguageProvider} from '../../utils/language';
import {parse} from 'query-string';
import {useUser} from '../../utils/user';

export default function Edit(props) {
  const [lang, setLang] = useState('en');
  const {user, setToken} = useUser();

  function logOut() {
    setToken('');
  }

  function toggleLang() {
    setLang(prevLang => (prevLang === 'en' ? 'fr' : 'en'));
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
              <LanguageButtonBase lang={lang} onClick={toggleLang} />
              <Button
                disabled={!user}
                onClick={logOut}
                variant="outlined"
                style={{marginLeft: 8}}
              >
                Log out
              </Button>
            </HeaderBase>
            <LanguageProvider lang={lang}>
              <EditorTable {...parse(props.location.search)} />
            </LanguageProvider>
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
