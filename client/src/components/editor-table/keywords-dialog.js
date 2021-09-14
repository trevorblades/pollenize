import CreateKeywordForm from './create-keyword-form';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import UpdateKeywordForm from './update-keyword-form';
import {
  Button,
  CardActionArea,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
        <Grid container spacing={2}>
          {election.keywords.map(keyword => (
            <Grid item key={keyword.id} xs={4}>
              <CardActionArea onClick={() => setKeyword(keyword)}>
                <Typography>{keyword.words[0].text}</Typography>
                {!keyword.definitions.length && <span>⚠️</span>}
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
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
