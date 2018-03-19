const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "migrationStorageTableName": "sequelize_meta"
  },
  "test": {
    "username": process.env.TEST_DB_USER,
    "password": process.env.TEST_DB_PASS,
    "database": process.env.TEST_DB_DATABASE,
    "host": process.env.TEST_DB_HOST,
    "dialect": "postgres",
    "migrationStorageTableName": "sequelize_meta"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "migrationStorageTableName": "sequelize_meta"
  }
};
