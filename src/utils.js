import {sequelize} from './db';

export function getMessageResolver(methodName = 'getMessages') {
  return async (parent, {languageId}) => {
    const [message] = await parent[methodName]({
      order: [
        [sequelize.where(sequelize.col('languageId'), languageId), 'DESC']
        // TODO: secondary order on default lang??
      ]
    });
    return message ? message.text : null;
  };
}

export async function bulkCreateUpdate(items, model) {
  const oldItems = await Promise.all(
    items
      .filter(item => item.id)
      .map(async ({id, ...args}) => {
        const instance = await model.findByPk(id);
        return instance.update(args);
      })
  );

  const newItems = await model.bulkCreate(items.filter(item => !item.id), {
    returning: true
  });

  return [...oldItems, ...newItems];
}
