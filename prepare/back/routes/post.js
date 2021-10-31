const express = require('express');

const router = express.Router();

//* 생성하기 (postman Tools)
router.post('/', (req, res) => {
  res.json({ id: 1, content: 'hello 01' });
}); // POST /post

//* 삭제하기
router.delete('/', (req, res) => {
  res.json({ id: 1 });
}); // DELETE /post

module.exports = router;

// $npm i sequelize sequelize-cli mysql2
// $npx sequelize init

/*
1. homebrew 설치 후
2. $ brew install mysql
3. $ brew services start mysql
4. $ mysql_secure_installation
5. config/config.js에서 개발모드 username, password, database 설정 - "port": 3306
6. modules/index.js 에서 sequelize, db 연결
 */
