import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  Box,
  Button,
  Card,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from '@material-ui/core';
import {HEADER_HEIGHT} from './header-base';

export default function LoginForm(props) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

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
      props.setToken(token);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  return (
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
              {error && (
                <DialogContentText color="error">
                  {error.message}
                </DialogContentText>
              )}
              <TextField
                fullWidth
                autoFocus
                required
                autoComplete="off"
                margin="normal"
                label="Email address"
                type="email"
                name="email"
                variant="outlined"
              />
              <TextField
                fullWidth
                required
                margin="normal"
                label="Password"
                type="password"
                name="password"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button disabled={loading} size="large" type="submit">
                Log in
              </Button>
            </DialogActions>
          </form>
        </Card>
      </Box>
    </Box>
  );
}

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
};
