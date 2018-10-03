import Mustache from 'mustache';
import countBy from 'lodash/countBy';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import messages from './messages';
import uniqBy from 'lodash/uniqBy';
import {STAR_ID_DELIMITER} from './constants';
import {createSelector} from 'reselect';

function keyByLanguage(collection, languages) {
  return keyBy(collection, item => languages[item.language_id].code);
}

function keyMultipleByLanguage(languages, ...collections) {
  return collections.map(collection => keyByLanguage(collection, languages));
}

function augmentWithIndex(sources) {
  return source => ({
    ...source,
    index: findIndex(sources, ['url', source.url])
  });
}

const getElection = createSelector(
  state => state.election.data,
  election =>
    election && {
      ...election,
      languages: keyBy(election.languages, 'id'),
      sources: uniqBy(flatMap(election.topics, 'sources'), 'url')
    }
);

export const getTopics = createSelector(getElection, election =>
  election.topics.map(topic => {
    const [titles, descriptions] = keyMultipleByLanguage(
      election.languages,
      topic.titles,
      topic.descriptions
    );

    return {
      ...topic,
      titles,
      descriptions,
      sources: topic.sources.map(augmentWithIndex(election.sources))
    };
  })
);

const getEditMode = state => state.settings.editMode;
export const getCandidates = createSelector(
  getElection,
  getEditMode,
  (election, editMode) => {
    if (!election) {
      return [];
    }

    const filtered = editMode
      ? election.candidates
      : filter(election.candidates, 'active');

    return filtered.map(candidate => {
      const [parties, bios, captions] = keyMultipleByLanguage(
        election.languages,
        candidate.parties,
        candidate.bios,
        candidate.captions
      );

      const sources = election.sources.concat(
        uniqBy(flatMap(candidate.positions, 'sources'), 'url')
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
            messages: keyByLanguage(position.messages, election.languages),
            sources: position.sources.map(augmentWithIndex(sources))
          })),
          'topic_id'
        )
      };
    });
  }
);

const getLanguage = state => state.settings.language;
export const getLocalize = createSelector(
  getLanguage,
  language => (message, options) => {
    const template =
      (messages[message] && messages[message][language]) || message;
    return Mustache.render(template, options);
  }
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

    const codes = Object.keys(languages).map(key => languages[key].code);
    for (let i = 0; i < codes.length; i++) {
      const message = messages[codes[i]];
      if (message) {
        return {message};
      }
    }

    return {message: null};
  }
);

const getStars = state => state.stars;
export const getStarCounts = createSelector(getStars, stars => {
  const keys = Object.keys(stars);
  return countBy(keys, key => key.split(STAR_ID_DELIMITER)[0]);
});
