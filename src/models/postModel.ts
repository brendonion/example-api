import * as ORM from 'Sequelize';

export function initPostModel(sequelize: ORM.Sequelize) {
  return sequelize.define('Posts', {
    description: ORM.STRING,
    author: ORM.STRING,
  });
}
