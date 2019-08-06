import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography
} from '@material-ui/core';
import {FiInfo} from 'react-icons/fi';
import {languages, useLanguage} from '../../utils/language';

export default function IntroDialog(props) {
  const [state, setState] = useLocalStorage('intro', {});
  const [dialogOpen, setDialogOpen] = useState(!state[props.electionSlug]);
  const {language, setLanguage} = useLanguage();

  function openDialog() {
    setDialogOpen(true);
  }

  function closeDialog() {
    if (!state[props.electionSlug]) {
      setState(prevState => ({
        ...prevState,
        [props.electionSlug]: true
      }));
    }

    setDialogOpen(false);
  }

  return (
    <Fragment>
      <IconButton color="inherit" onClick={openDialog}>
        <FiInfo />
      </IconButton>
      <Dialog fullWidth open={dialogOpen} onClose={closeDialog}>
        <DialogTitle disableTypography>
          <Typography variant="h5">{props.title}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.text}</DialogContentText>
          <Typography
            gutterBottom
            display="block"
            color="textSecondary"
            variant="caption"
          >
            Select a language to continue:
          </Typography>
        </DialogContent>
        <DialogActions>
          {Object.entries(languages).map(([key, value]) => (
            <Button
              fullWidth
              variant="outlined"
              size="large"
              key={key}
              color={language === key ? 'primary' : 'default'}
              onClick={() => {
                setLanguage(key);
                closeDialog();
              }}
            >
              {value}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

IntroDialog.propTypes = {
  electionSlug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
