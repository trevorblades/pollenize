import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import mapValues from 'lodash/mapValues';
import messages from './messages';
import values from 'lodash/values';
import {createSelector} from 'reselect';

const getElection = state => state.election.data;
export const getCandidates = createSelector(getElection, election =>
  election.candidates.map(candidate => {
    const positions = flatMap(values(candidate.positions));
    const sources = flatMap(positions, 'sources');
    return {
      ...candidate,
      sources,
      firstName: candidate.name.replace(/\s+/, ' ').split(' ')[0],
      positions: mapValues(candidate.positions, positions =>
        positions.map(position => ({
          ...position,
          sources: position.sources.map(source => ({
            ...source,
            index: findIndex(sources, ['id', source.id])
          }))
        }))
      )
    };
  })
);

const getLanguage = state => state.settings.language;
export const getLocalize = createSelector(getLanguage, language => message =>
  (messages[message] && messages[message][language]) || message
);
