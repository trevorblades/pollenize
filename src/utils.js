import {sequelize} from './db';

export function getMessageResolver(methodName = 'getMessages') {
  return async (parent, {languageId}) => {
    const [message] = await parent[methodName]({
      order: [
        [sequelize.where(sequelize.col('languageId'), languageId), 'DESC']
      ]
    });
    return message ? message.text : null;
  };
}
