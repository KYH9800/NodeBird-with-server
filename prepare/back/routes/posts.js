const express = require('express');
const { Op } = require('sequelize');

const { Post, User, Image, Comment, Sequelize } = require('../models');

const router = express.Router();

// GET /posts
router.get('/', async (req, res, next) => {
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

// 팔로우한 사람의 게시글만 보여주기
router.get('/related', async (req, res, next) => {
  try {
    const followings = await User.findAll({
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'Followers', // 내가 팔로워인 사용자들이 내가 팔로잉한 사람들
        },
      ],
    });
    const where = {
      UserId: {
        [Op.in]: followings.map((v) => v.id),
      }, // [Op.in]: Sequelize.interal('Select id from') - example simple Sub-Query
    };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.in]: parseInt(req.query.lastId, 10) }; // Op: Operator
    } // 초기 로딩이 아닐 때
    const posts = await Post.findAll({
      where, // where: { id: lastId },
      limit: 10, // 10개만 가져와라
      order: [['createdAt', 'DESC']],
      include: [
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
// 팔로우하지 않은 사람의 게시글만 보여주기 (나의 게시글도 제외)
router.get('/unrelated', async (req, res, next) => {
  try {
    const followings = await User.findAll({
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'Followers', // 내가 팔로워인 사용자들이 내가 팔로잉한 사람들
        },
      ],
    });
    const where = {
      UserId: {
        [Op.notIn]: followings.map((v) => v.id).concat(req.user.id), // 내가 팔로잉한 사람들과 나의 아이디는 제외하고
      }, // [Op.in]: Sequelize.interal('Select id from') - example simple Sub-Query
    };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.in]: parseInt(req.query.lastId, 10) }; // Op: Operator
    } // 초기 로딩이 아닐 때
    const posts = await Post.findAll({
      where, // where: { id: lastId },
      limit: 10, // 10개만 가져와라
      order: [['createdAt', 'DESC']],
      include: [
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
