const express = require('express');

const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      // where: { id: lastId },
      limit: 10, // 10개만 가져와라
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'], // 댓글을 내림차순으로 정렬
      ],
      include: [
        {
          model: User,
          attributes: {
            attributes: ['id', 'nickname'],
          },
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
      ],
    }); // findAll: 모든 것
    console.log('posts', posts);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
}); // GET /posts

module.exports = router;
