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
