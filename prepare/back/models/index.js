const { Sequelize } = require('sequelize');
const comment = require('./comment');
const hashtag = require('./hashtag');
const image = require('./image');
const post = require('./post');
const user = require('./user');

const env = process.env.NODE_ENV || 'development'; // 환경변수 설정, 기본값(|| 기본값 연산자)
const config = require('../config/config')[env]; // json 객체의 development 불러오기
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// model들을 등록, 함수 실행
db.Comment = comment;
db.Hashtag = hashtag;
db.Image = image;
db.Post = post;
db.User = user;

// Class 최적화 시 추가
Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

// 반복문으로 돌면서 associate에서 관계들 연결해준다
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db안에 sequelize를 넣어둠
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
