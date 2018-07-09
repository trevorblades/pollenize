import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import flatMapDeep from 'lodash/flatMapDeep';
import groupBy from 'lodash/groupBy';
import messages from './messages';
import mapValues from 'lodash/mapValues';
import {createSelector} from 'reselect';

const getElection = state => state.election.data;
export const getCandidates = createSelector(getElection, election =>
  election.candidates.map(candidate => {
    const sources = groupBy(
      flatMapDeep(candidate.positions, position =>
        position.messages.map(message =>
          message.sources.map(source => ({
            ...source,
            language: message.language
          }))
        )
      ),
      'language.code'
    );

    return {
      ...candidate,
      sources,
      firstName: candidate.name.replace(/\s+/, ' ').split(' ')[0],
      positions: mapValues(
        groupBy(
          flatMap(candidate.positions, position =>
            position.messages.map(message => ({
              ...message,
              topic_id: position.topic_id,
              sources: message.sources.map(source => ({
                ...source,
                index: findIndex(sources[message.language.code], [
                  'id',
                  source.id
                ])
              }))
            }))
          ),
          'topic_id'
        ),
        value => groupBy(value, 'language.code')
      )
    };
  })
);

const getLanguage = state => state.settings.language;
export const getLocalize = createSelector(getLanguage, language => message =>
  (messages[message] && messages[message][language]) || message
);
