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
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.email.value);
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
        <Box width={480}>
          <Card raised>
            <form onSubmit={handleSubmit}>
              <DialogTitle disableTypography>
                <Typography variant="overline">Admins only</Typography>
                <Typography variant="h4">Auth required</Typography>
              </DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Email address"
                  name="email"
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Password"
                  type="password"
                  name="password"
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" variant="outlined" color="primary">
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
