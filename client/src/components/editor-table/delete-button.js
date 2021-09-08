import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import {useMutation} from '@apollo/client';

export default function DeleteButton(props) {
  const [confirmShown, setConfirmShown] = useState(false);
  const [mutate, {loading}] = useMutation(
    props.mutation,
    props.mutationOptions
  );

  function showConfirm() {
    setConfirmShown(true);
  }

  function hideConfirm() {
    setConfirmShown(false);
  }

  return (
    <Box color="error.main" mr="auto">
      <Button color="inherit" onClick={showConfirm}>
        Delete stance
      </Button>
      {confirmShown && (
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          width={1}
          height={1}
          top={0}
          left={0}
          color="text.primary"
          zIndex="modal"
          bgcolor="rgba(255,255,255,0.85)"
        >
          <Typography gutterBottom variant="h4">
            Are you sure?
          </Typography>
          <Typography paragraph>
            This {props.noun} will be <strong>permanently</strong> deleted.
          </Typography>
          <div>
            <Button
              disabled={loading}
              variant="outlined"
              color="primary"
              onClick={hideConfirm}
              style={{marginRight: 16}}
            >
              No
            </Button>
            <Button disabled={loading} variant="outlined" onClick={mutate}>
              Yes, delete {props.noun}
            </Button>
          </div>
        </Box>
      )}
    </Box>
  );
}

DeleteButton.propTypes = {
  noun: PropTypes.string.isRequired,
  mutation: PropTypes.object.isRequired,
  mutationOptions: PropTypes.object.isRequired
};
