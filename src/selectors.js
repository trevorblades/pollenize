import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import messages from './messages';
import {createSelector} from 'reselect';

const getElection = state => state.election.data;
export const getCandidates = createSelector(getElection, election => {
  const languages = keyBy(election.languages, 'id');
  return election.candidates.map(candidate => {
    const sources = flatMap(candidate.positions, 'sources');
    return {
      ...candidate,
      sources,
      firstName: candidate.name.replace(/\s+/, ' ').split(' ')[0],
      parties: keyBy(
        candidate.parties,
        party => languages[party.language_id].code
      ),
      bios: keyBy(candidate.bios, bio => languages[bio.language_id].code),
      positions: groupBy(
        flatMap(candidate.positions, position => ({
          ...position,
          messages: keyBy(
            position.messages,
            message => languages[message.language_id].code
          ),
          sources: position.sources.map(source => ({
            ...source,
            index: findIndex(sources, ['id', source.id])
          }))
        })),
        'topic_id'
      )
    };
  });
});

const getLanguage = state => state.settings.language;
export const getLocalize = createSelector(getLanguage, language => message =>
  (messages[message] && messages[message][language]) || message
);
