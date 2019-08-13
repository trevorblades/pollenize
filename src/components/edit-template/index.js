import EditorTable from './editor-table';
import ElectionMenu from '../election-menu';
import Header from '../header';
import HeaderBase from '../header-base';
import Layout from '../layout';
import LoginForm from '../login-form';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Button, NoSsr} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {graphql} from 'gatsby';
import {useUser} from '../../utils/user';

export default function EditTemplate(props) {
  const {user, setToken} = useUser();
  const {
    id,
    title,
    slug,
    candidates,
    partyFirst
  } = props.data.pollenize.election;

  function logOut() {
    setToken('');
  }

  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>{title}</title>
      </Helmet>
      <NoSsr>
        {user ? (
          <Fragment>
            <HeaderBase title={title} link="/elections">
              <ElectionMenu
                title={title}
                electionSlug={slug}
                candidates={candidates}
                partyFirst={partyFirst}
              />
              <Button
                disabled={!user}
                onClick={logOut}
                variant="outlined"
                style={{marginLeft: 8}}
              >
                Log out
              </Button>
            </HeaderBase>
            <EditorTable id={id} />
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

EditTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query EditQuery($id: ID!) {
    pollenize {
      election(id: $id) {
        id
        slug
        title
        partyFirst
        candidates(active: true) {
          id
          slug
          name
          partyEn
          partyFr
          portrait
        }
      }
    }
  }
`;
