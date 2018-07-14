import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import messages from './messages';
import {createSelector} from 'reselect';

function keyByLanguage(collection, languages) {
  return keyBy(collection, item => languages[item.language_id].code);
}

function keyMultipleByLanguage(languages, ...collections) {
  return collections.map(collection => keyByLanguage(collection, languages));
}

export const getElection = createSelector(
  state => state.election.data,
  election => {
    const languages = keyBy(election.languages, 'id');
    return {
      ...election,
      topics: election.topics.map(topic => {
        const [titles, descriptions] = keyMultipleByLanguage(
          languages,
          topic.titles,
          topic.descriptions
        );

        return {
          ...topic,
          titles,
          descriptions
        };
      })
    };
  }
);

export const getCandidates = createSelector(getElection, election => {
  const languages = keyBy(election.languages, 'id');
  return election.candidates.map(candidate => {
    const sources = flatMap(candidate.positions, 'sources');
    const [parties, bios, captions] = keyMultipleByLanguage(
      languages,
      candidate.parties,
      candidate.bios,
      candidate.captions
    );

    return {
      ...candidate,
      sources,
      parties,
      bios,
      captions,
      firstName: candidate.name.replace(/\s+/, ' ').split(' ')[0],
      positions: groupBy(
        flatMap(candidate.positions, position => ({
          ...position,
          messages: keyByLanguage(position.messages, languages),
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

export const getMatchMessage = createSelector(
  getLanguage,
  getElection,
  (language, {languages}) => messages => {
    const message = messages[language];
    if (message) {
      return {
        message,
        match: true
      };
    }

    for (let i = 0; i < languages.length; i++) {
      const message = messages[languages[i].code];
      if (message) {
        return {message};
      }
    }

    return {message: null};
  }
);
