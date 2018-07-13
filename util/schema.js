export const exists = {
  trim: true,
  exists: true
};

export const notEmpty = {
  isEmpty: {
    negated: true
  }
};

export const isArray = {isArray: true};
export const notEmptyArray = {
  ...isArray,
  ...notEmpty
};

export const notEmptyString = {
  trim: true,
  ...notEmpty
};

export const isInt = {
  isInt: true,
  toInt: true
};

const sanitizeJSON = {
  customSanitizer: {
    options: JSON.parse
  }
};

export const stringToArray = {
  ...isArray,
  ...sanitizeJSON
};

export const stringToNotEmptyArray = {
  ...notEmptyArray,
  ...sanitizeJSON
};
