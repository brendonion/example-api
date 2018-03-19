import * as ORM from 'Sequelize';

const options: ORM.LoggingOptions = {
  benchmark: true, 
  logging: console.log,
  define: {
    underscored: true
  }
};

const sequelize: ORM.Sequelize = new ORM(process.env.DB_DATABASE, options);

export default sequelize;
