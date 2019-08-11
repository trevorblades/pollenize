import PropTypes from 'prop-types';
import React, {Fragment, useRef, useState} from 'react';
import gql from 'graphql-tag';
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
import {STANCE_FRAGMENT} from '../../utils/queries';
import {useMutation} from '@apollo/react-hooks';
import {withProps} from 'recompose';

const UPDATE_STANCE = gql`
  mutation UpdateStance(
    $id: ID!
    $textEn: String
    $textFr: String
    $sources: [SourceInput]
  ) {
    updateStance(id: $id, textEn: $textEn, textFr: $textFr, sources: $sources) {
      ...StanceFragment
    }
  }
  ${STANCE_FRAGMENT}
`;

const SourceField = withProps({
  margin: 'dense',
  fullWidth: true,
  type: 'url'
})(TextField);

export default function StanceForm(props) {
  const form = useRef(null);
  const [sources, setSources] = useState(props.stance.sources);
  const [updateStance, {loading, error}] = useMutation(UPDATE_STANCE, {
    onCompleted: props.onClose,
    variables: {
      id: props.stance.id
    }
  });

  function submitForm() {
    const {textEn, textFr} = form.current;
    updateStance({
      variables: {
        textEn: textEn.value,
        textFr: textFr.value,
        sources: sources.map(source => ({
          id: source.new ? null : source.id,
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
        <Typography variant="overline">Editing stance</Typography>
        <Typography variant="h4">{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <form ref={form}>
          {error && (
            <Typography gutterBottom color="error">
              {error.message}
            </Typography>
          )}
          <FormField
            multiline
            label="Text (EN)"
            name="textEn"
            defaultValue={props.stance.textEn}
            disabled={loading}
          />
          <FormField
            multiline
            label="Texte (FR)"
            name="textFr"
            defaultValue={props.stance.textFr}
            disabled={loading}
          />
          <Typography variant="h6" style={{marginTop: 16}}>
            Sources
          </Typography>
          {sources.map(source => (
            <SourceField
              defaultValue={source.url}
              key={source.id}
              disabled={loading}
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
            disabled={loading}
            placeholder={`Add ${sources.length ? 'another' : 'a'} source`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" color="inherit">
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
        <Button disabled={loading} color="primary" onClick={submitForm}>
          Save changes
        </Button>
      </DialogActions>
    </Fragment>
  );
}

StanceForm.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  stance: PropTypes.object.isRequired
};
