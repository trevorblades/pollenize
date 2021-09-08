import LanguageFields from './language-fields';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@material-ui/core';
import {KEYWORD_FRAGMENT} from '../../utils/queries';
import {getMessageInputs} from '../../utils';
import {gql, useMutation} from '@apollo/client';

const UPDATE_KEYWORD = gql`
  mutation UpdateKeyword(
    $id: ID!
    $words: [MessageInput]!
    $definitions: [MessageInput]!
  ) {
    updateKeyword(id: $id, words: $words, definitions: $definitions) {
      ...KeywordFragment
    }
  }
  ${KEYWORD_FRAGMENT}
`;

export default function UpdateKeywordForm({onClose, keyword, languages}) {
  const [updateKeyword, {error, loading}] = useMutation(UPDATE_KEYWORD, {
    onCompleted: onClose
  });

  function handleSubmit(event) {
    event.preventDefault();
    updateKeyword({
      variables: {
        id: keyword.id,
        words: getMessageInputs(event.target['word[]']),
        definitions: getMessageInputs(event.target['definition[]'])
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle disableTypography>
        <Typography variant="overline">Editing keyword</Typography>
      </DialogTitle>
      <DialogContent>
        {error && (
          <DialogContentText color="error">{error.message}</DialogContentText>
        )}
        <LanguageFields
          disabled={loading}
          languages={languages}
          messages={keyword.words}
          label="Word"
          name="word"
        />
        <LanguageFields
          multiline
          disabled={loading}
          languages={languages}
          messages={keyword.definitions}
          label="Definition"
          name="definition"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" color="primary" disabled={loading}>
          Save changes
        </Button>
      </DialogActions>
    </form>
  );
}

UpdateKeywordForm.propTypes = {
  keyword: PropTypes.object.isRequired,
  languages: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired
};
