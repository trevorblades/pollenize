import CreateKeywordForm from './create-keyword-form';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import UpdateKeywordForm from './update-keyword-form';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';

export default function KeywordsDialog({election, onClose}) {
  const [keyword, setKeyword] = useState(null);
  return keyword ? (
    <UpdateKeywordForm
      onClose={() => setKeyword(null)}
      languages={election.languages}
      keyword={keyword}
    />
  ) : (
    <>
      <DialogTitle disableTypography>
        <Typography variant="overline">All keywords</Typography>
      </DialogTitle>
      <DialogContent>
        <CreateKeywordForm
          election={election}
          onCompleted={data => setKeyword(data.createKeyword)}
        />
        <List>
          {election.keywords.map(keyword => (
            <ListItem
              button
              onClick={() => setKeyword(keyword)}
              key={keyword.id}
            >
              <ListItemText primary={keyword.words[0].text} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Done</Button>
      </DialogActions>
    </>
  );
}

KeywordsDialog.propTypes = {
  election: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};
