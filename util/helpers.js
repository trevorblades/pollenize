import camelCase from 'lodash/camelCase';
import {Message} from '../models';

export async function bulkCreateAndSet(
  instance,
  data,
  model,
  key = model.getTableName()
) {
  const created = await model.bulkCreate(data, {returning: true});
  const methodName = camelCase(`set_${key}`);
  await instance[methodName](created);
  instance.setDataValue(key, created);
}

export function setMessage(instance, data, key) {
  return bulkCreateAndSet(instance, data, Message, key);
}

export function setMessages(instance, data, keys) {
  return Promise.all(keys.map(key => setMessage(instance, data[key], key)));
}
