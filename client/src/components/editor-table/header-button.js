import DialogButton from './dialog-button';
import PropTypes from 'prop-types';
import React from 'react';
import {Box, CardActionArea, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  headerButton: {
    height: '100%',
    padding: theme.spacing(2)
  }
}));

export default function HeaderButton({title, children, ...props}) {
  const {headerButton} = useStyles();
  return (
    <DialogButton
      renderButton={openDialog => (
        <Box {...props}>
          <CardActionArea onClick={openDialog} className={headerButton}>
            <Typography variant="subtitle1">{title}</Typography>
          </CardActionArea>
        </Box>
      )}
    >
      {children}
    </DialogButton>
  );
}

HeaderButton.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};
