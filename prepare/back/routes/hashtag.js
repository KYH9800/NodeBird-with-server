const express = require('express');
const { Op } = require('sequelize');

const { Post, User, Image, Comment, Hashtag } = require('../models');

const router = express.Router();

// GET /hashtag/노드
router.get('/:hashtag', async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }; // Op: Operator
    } // 초기 로딩이 아닐 때
    const posts = await Post.findAll({
      where, // where: { id: lastId },
      limit: 10, // 10개만 가져와라
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Hashtag,
          where: {
            name: req.params.hashtag,
          },
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
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
              order: [['createdAt', 'DESC']], // 댓글을 내림차순으로 정렬
            },
          ],
        },
        {
          model: User, // 좋아요 누른사람
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    }); // findAll: 모든 것
    // console.log('posts', posts);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
