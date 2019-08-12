import Header from '../../components/header';
import Layout from '../../components/layout';
import React from 'react';
import gql from 'graphql-tag';
import {
  Box,
  Button,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from '@material-ui/core';
import {FormCard, FormField} from '../../components/common';
import {Helmet} from 'react-helmet';
import {navigate} from 'gatsby';
import {useMutation} from '@apollo/react-hooks';
import {useUser} from '../../utils/user';

const SET_PASSWORD = gql`
  mutation SetPassword(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    setPassword(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    )
  }
`;

export default function Password() {
  const {setToken} = useUser();
  const [setPassword, {loading, error}] = useMutation(SET_PASSWORD, {
    onCompleted(data) {
      setToken(data.setPassword);
      navigate('/');
    }
  });

  function handleSubmit(event) {
    event.preventDefault();

    const {email, password, confirmPassword} = event.target;
    setPassword({
      variables: {
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      }
    });
  }

  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <FormCard>
        <form onSubmit={handleSubmit}>
          <DialogTitle disableTypography>
            <Typography variant="overline">Finish your account</Typography>
            <Typography variant="h4">Set a password</Typography>
          </DialogTitle>
          <Box py={1} px={3}>
            {error && (
              <DialogContentText color="error">
                {error.message}
              </DialogContentText>
            )}
            <FormField
              autoFocus
              required
              disabled={loading}
              autoComplete="off"
              label="Email address"
              type="email"
              name="email"
              variant="outlined"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormField
                  required
                  disabled={loading}
                  label="Password"
                  type="password"
                  name="password"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <FormField
                  required
                  disabled={loading}
                  label="Repeat password"
                  type="password"
                  name="confirmPassword"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
          <DialogActions>
            <Button disabled={loading} size="large" type="submit">
              Set password
            </Button>
          </DialogActions>
        </form>
      </FormCard>
    </Layout>
  );
}
