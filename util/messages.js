import {Message} from '../models';
import {bulkCreateAndSet} from './helpers';
import {
  isArray,
  isInt,
  notEmptyArray,
  notEmptyString,
  stringToArray,
  stringToNotEmptyArray
} from './schema';

export function setMessage(instance, data, key) {
  return bulkCreateAndSet(instance, data, Message, key);
}

export function setMessages(instance, data, keys) {
  return Promise.all(keys.map(key => setMessage(instance, data[key], key)));
}

function getArraySchema(required, stringify) {
  if (stringify) {
    return required ? stringToNotEmptyArray : stringToArray;
  }
  return required ? notEmptyArray : isArray;
}

export function getMessageSchema(key, ...arraySchemaArgs) {
  return {
    [key]: getArraySchema(...arraySchemaArgs),
    [`${key}.*.text`]: notEmptyString,
    [`${key}.*.language_id`]: isInt
  };
}
