import PropTypes from 'prop-types';
import React, {Fragment, useRef, useState} from 'react';
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
import {MdClose, MdKeyboardReturn} from 'react-icons/md';
import {withProps} from 'recompose';

const SourceField = withProps({
  margin: 'dense',
  fullWidth: true,
  type: 'url'
})(TextField);

export default function StanceForm(props) {
  const form = useRef(null);
  const [sources, setSources] = useState(props.stance.sources);

  function submitForm() {
    const {textEn, textFr} = form.current;
    props.mutation({
      variables: {
        textEn: textEn.value,
        textFr: textFr.value,
        sources: sources.map(source => ({
          id: source.new ? undefined : source.id,
          url: source.url
        }))
      }
    });
  }

  function handleSubmit(event) {
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
        <Typography variant="overline">{props.title}</Typography>
        <Typography variant="h4">{`${props.candidate.name}/${props.topic.titleEn}`}</Typography>
      </DialogTitle>
      <DialogContent>
        <form ref={form}>
          {props.error && (
            <Typography gutterBottom color="error">
              {props.error.message}
            </Typography>
          )}
          <FormField
            multiline
            label="Text (EN)"
            name="textEn"
            defaultValue={props.stance.textEn}
            disabled={props.loading}
          />
          <FormField
            multiline
            label="Texte (FR)"
            name="textFr"
            defaultValue={props.stance.textFr}
            disabled={props.loading}
          />
          <Typography variant="h6" style={{marginTop: 16}}>
            Sources
          </Typography>
          {sources.map(source => (
            <SourceField
              defaultValue={source.url}
              key={source.id}
              disabled={props.loading}
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
        <form onSubmit={handleSubmit}>
          <SourceField
            required
            name="source"
            autoComplete="off"
            disabled={props.loading}
            placeholder={`Add ${sources.length ? 'another' : 'a'} source`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <MdKeyboardReturn />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        {props.children}
        <Button onClick={props.onClose}>Cancel</Button>
        <Button disabled={props.loading} color="primary" onClick={submitForm}>
          {props.buttonText}
        </Button>
      </DialogActions>
    </Fragment>
  );
}

StanceForm.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  stance: PropTypes.object.isRequired,
  candidate: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  mutation: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};
