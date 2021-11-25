const express = require('express');

const { Post, Comment, Image, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

//* 생성하기 (postman Tools)
// 게시글 작성
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
}); // POST /post

// 댓글 작성
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
}); // POST /post/1/commment

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
..
MySQLWorkbench 설치
..
5. config/config.js에서 개발모드 username, password, database 설정 - "port": 3306
6. modules/index.js 에서 sequelize, db 연결

7. $npx sequelize db:create MySQL workbanch // 서버연결
 */
