import prependHttp from 'prepend-http';
import youtubeRegex from 'youtube-regex';

const exists = {
  trim: true,
  exists: true
};

const notEmpty = {
  isEmpty: {
    negated: true
  }
};

const isArray = {isArray: true};
const notEmptyArray = {
  ...isArray,
  ...notEmpty
};

const notEmptyString = {
  trim: true,
  ...notEmpty
};

const isInt = {
  isInt: true,
  toInt: true
};

export const election = {
  slug: notEmptyString,
  title: notEmptyString,
  public: {
    isBoolean: true
  }
};

export const topic = {
  title: notEmptyString,
  slug: notEmptyString,
  description: exists,
  election_id: isInt,
  file: {
    optional: true,
    equals: {
      options: 'null'
    }
  }
};

export const reorderTopics = {
  topics: isArray,
  'topics.*.id': isInt,
  'topics.*.order': isInt
};

export const candidate = {
  slug: notEmptyString,
  name: notEmptyString,
  birth_date: {
    isISO8601: true
  },
  hometown: exists,
  parties: {
    ...notEmptyArray,
    customSanitizer: {
      options: JSON.parse
    }
  },
  'parties.*.text': notEmptyString,
  'parties.*.language_id': isInt,
  bios: {
    ...notEmptyArray,
    customSanitizer: {
      options: JSON.parse
    }
  },
  'bios.*.text': notEmptyString,
  'bios.*.language_id': isInt,
  color: {
    isHexColor: true
  },
  video_url: {
    optional: {
      options: {
        checkFalsy: true
      }
    },
    custom: {
      options: value => youtubeRegex().test(value)
    }
  },
  video_caption: exists,
  election_id: isInt
};

export const position = {
  messages: notEmptyArray,
  'messages.*.text': notEmptyString,
  'messages.*.language_id': isInt,
  sources: isArray,
  'sources.*.url': {
    customSanitizer: {
      options: prependHttp
    },
    isURL: true
  },
  candidate_id: isInt,
  topic_id: isInt
};
