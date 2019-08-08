import Header from '../components/header';
import Layout from '../components/layout';
import React from 'react';
import {
  Box,
  Button,
  Card,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@material-ui/core';
import {HEADER_HEIGHT} from '../components/header-base';
import {Helmet} from 'react-helmet';

export default function Admin() {
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const {email, password} = event.target;
      const response = await fetch(`${process.env.GATSBY_API_URL}/auth`, {
        headers: new Headers({
          Authorization: `Basic ${btoa(`${email.value}:${password.value}`)}`
        })
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const token = await response.text();
      console.log(token);
    } catch (error) {
      // handle error
    }
  }

  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Admin</title>
      </Helmet>
      <Header />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={`calc(100vh - ${HEADER_HEIGHT}px)`}
      >
        <Box width={500}>
          <Card raised>
            <form onSubmit={handleSubmit}>
              <DialogTitle disableTypography>
                <Typography variant="overline">Admins only</Typography>
                <Typography variant="h4">Auth required</Typography>
              </DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  autoFocus
                  autoComplete="off"
                  margin="normal"
                  label="Email address"
                  name="email"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  name="password"
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button size="large" type="submit">
                  Log in
                </Button>
              </DialogActions>
            </form>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
}
