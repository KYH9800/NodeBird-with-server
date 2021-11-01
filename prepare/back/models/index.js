const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development'; // 환경변수 설정, 기본값(|| 기본값 연산자)
const config = require('../config/config')[env]; // json 객체의 development 불러오기
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
