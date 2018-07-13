import camelCase from 'lodash/camelCase';
import {Utils} from 'sequelize';

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

function createThroughAssociation(model, associated, through, as) {
  const options = {through};
  if (as) {
    options.as = {
      singular: as,
      plural: Utils.pluralize(as)
    };
  }

  model.belongsToMany(associated, options);
}

export function createThroughAssociations(model, associated, ...associations) {
  associations.forEach(association =>
    createThroughAssociation(model, associated, ...association)
  );
}
