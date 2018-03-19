const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "migrationStorageTableName": "sequelize_meta",
    "options": {
      "host": process.env.DB_HOST,
      "dialect": "postgres",
      "benchmark": true, 
      "logging": console.log,
      "define": {
        "underscored": true,
        "freezeTableName": true,
      }
    }
  },
  "test": {
    "username": process.env.TEST_DB_USER,
    "password": process.env.TEST_DB_PASS,
    "database": process.env.TEST_DB_DATABASE,
    "migrationStorageTableName": "sequelize_meta",
    "options": {
      "host": process.env.TEST_DB_HOST,
      "dialect": "postgres",
      "benchmark": true, 
      "logging": console.log,
      "define": {
        "underscored": true,
        "freezeTableName": true,
      }
    }
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "migrationStorageTableName": "sequelize_meta",
    "options": {
      "host": process.env.DB_HOST,
      "dialect": "postgres",
      "benchmark": true, 
      "migrationStorageTableName": "sequelize_meta",
      "define": {
        "underscored": true,
        "freezeTableName": true,
      }
    }
  }
};
