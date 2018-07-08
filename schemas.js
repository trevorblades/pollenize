import prependHttp from 'prepend-http';
import youtubeRegex from 'youtube-regex';

const exists = {
  trim: true,
  exists: true
};

const notEmpty = {
  trim: true,
  isEmpty: {
    negated: true
  }
};

const isArray = {isArray: true};
const isInt = {
  isInt: true,
  toInt: true
};

export const election = {
  slug: notEmpty,
  title: notEmpty,
  public: {
    isBoolean: true
  }
};

export const topic = {
  title: notEmpty,
  slug: notEmpty,
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
  slug: notEmpty,
  name: notEmpty,
  birth_date: {
    isISO8601: true
  },
  hometown: exists,
  bio: exists,
  party: notEmpty,
  color: {
    isHexColor: true
  },
  video_url: {
    custom: {
      options: value => youtubeRegex().test(value)
    }
  },
  video_caption: exists,
  election_id: isInt
};

export const position = {
  text: notEmpty,
  sources: isArray,
  'sources.*': {
    customSanitizer: {
      options: value => ({url: prependHttp(value)})
    }
  },
  'sources.*.url': {
    // prependHttp trims so we don't need to set trim: true here
    isURL: true
  },
  candidate_id: isInt,
  topic_id: isInt
};
