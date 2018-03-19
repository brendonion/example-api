import * as fs from "fs";
import * as path from "path";
import * as ORM from "sequelize";
import { UserInstance, UserAttributes } from "./user";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/database")[env];

interface DbConnection {
  user: ORM.Model<UserInstance, UserAttributes>
}
let db: any = {};

const sequelize: ORM.Sequelize = new ORM(
  config.database,
  config.username,
  config.password,
  config
);

const basename = path.basename(module.filename);
fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js")
  })
  .forEach((file: string) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model["name"]] = model;
  });

Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
});

db.sequelize = sequelize;
db.Sequelize = ORM;
console.log(db.user);


export default <DbConnection>db;

// 'use strict';

// var fs        = require('fs');
// var path      = require('path');
// var Sequelize = require('sequelize');
// var basename  = path.basename(__filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/database.js')[env];
// var db        = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
