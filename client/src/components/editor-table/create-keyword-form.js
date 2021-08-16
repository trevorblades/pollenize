import PropTypes from 'prop-types';
import React from 'react';
import {GET_ELECTION, KEYWORD_FRAGMENT} from '../../utils/queries';
import {IconButton, InputAdornment, TextField} from '@material-ui/core';
import {MdCheck} from 'react-icons/md';
import {gql, useMutation} from '@apollo/client';

const CREATE_KEYWORD = gql`
  mutation CreateKeyword($word: MessageInput!, $electionId: ID!) {
    createKeyword(word: $word, electionId: $electionId) {
      ...KeywordFragment
    }
  }
  ${KEYWORD_FRAGMENT}
`;

export default function CreateKeywordForm(props) {
  const [createKeyword, {error, loading}] = useMutation(CREATE_KEYWORD, {
    onCompleted: props.onCompleted,
    update(cache, {data}) {
      const {election} = cache.readQuery({
        query: GET_ELECTION,
        variables: {
          id: props.election.id
        }
      });

      cache.writeQuery({
        query: GET_ELECTION,
        data: {
          election: {
            ...election,
            keywords: [...election.keywords, data.createKeyword]
          }
        }
      });
    }
  });

  function handleSubmit(event) {
    event.preventDefault();
    createKeyword({
      variables: {
        electionId: props.election.id,
        word: {
          text: event.target.word.value,
          languageId: props.election.languages[0].id
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        required
        error={Boolean(error)}
        helperText={error?.message}
        label="New keyword"
        variant="outlined"
        name="word"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disabled={loading} color="primary" type="submit">
                <MdCheck />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </form>
  );
}

CreateKeywordForm.propTypes = {
  election: PropTypes.object.isRequired,
  onCompleted: PropTypes.func.isRequired
};
