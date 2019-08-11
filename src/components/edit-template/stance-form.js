import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core';
import {FormField} from '../common';
import {MdCheck, MdClose} from 'react-icons/md';
import {withProps} from 'recompose';

const SourceField = withProps({
  margin: 'dense',
  fullWidth: true,
  type: 'url'
})(TextField);

export default function StanceForm(props) {
  const [sources, setSources] = useState(props.stance.sources);

  function handleSourceSubmit(event) {
    event.preventDefault();

    setSources(prevSources => [
      ...prevSources,
      {
        id: Date.now(),
        new: true,
        url: event.target.source.value
      }
    ]);

    event.target.reset();
  }

  function removeSource(id) {
    setSources(prevSources => prevSources.filter(source => source.id !== id));
  }

  return (
    <Fragment>
      <DialogTitle disableTypography>
        <Typography variant="overline">Editing stance</Typography>
        <Typography variant="h4">{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <form>
          <FormField
            multiline
            label="Text (EN)"
            name="textEn"
            defaultValue={props.stance.textEn}
          />
          <FormField
            multiline
            label="Texte (FR)"
            name="textFr"
            defaultValue={props.stance.textEn}
          />
          <Typography variant="h6" style={{marginTop: 16}}>
            Sources
          </Typography>
          {sources.map(source => (
            <SourceField
              defaultValue={source.url}
              key={source.id}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => removeSource(source.id)}>
                      <MdClose />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          ))}
        </form>
        <form onSubmit={handleSourceSubmit}>
          <SourceField
            required
            name="source"
            autoComplete="off"
            placeholder={`Add ${sources.length ? 'another' : 'a'} source`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" color="primary">
                    <MdCheck />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Fragment>
  );
}

StanceForm.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  stance: PropTypes.object.isRequired
};
