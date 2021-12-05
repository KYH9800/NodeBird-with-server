const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// 현재 CSR인 상태 >> 이후 CCR로 서버사이드 렌더링(Next.js)
// GET /user
router.get('/', async (req, res, next) => {
  console.log(req.headers); // headers 안에 cookie가 들어있다
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
      });
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'], // 원하는 정보만 가져오거나 가져오지 않겠다 / 현재: pw 빼고 다 가져오겠다
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
        ], // 가져올 정보중 뺄 것들
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET /user/1
router.get('/:userId', async (req, res, next) => {
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password'], // 원하는 정보만 가져오거나 가져오지 않겠다 / 현재: pw 빼고 다 가져오겠다
      },
      include: [
        {
          model: Post,
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },
      ], // 가져올 정보중 뺄 것들
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length; // 개인정보 침해 예방
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).send('존재하지 않는 사용자입니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET /user/followers
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      res.status(403).send('찾고자 하는 사람이 없습니다.');
    }
    const followers = await user.getFollowers({
      attributes: {
        exclude: ['password', 'email'],
      },
    });
    res.status(200).json(followers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET /user/followings
router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      res.status(403).send('찾고자 하는 사람이 없습니다.');
    }
    const followings = await user.getFollowings({
      attributes: {
        exclude: ['password', 'email'],
      },
    });
    res.status(200).json(followings);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET /user/1/posts
router.get('/:userId/posts', async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId };
    // page-nation
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

// err: 서버에러, user: 성공객체, info: 정보 // middleware 확장
// POST /user/login
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      return res.status(401).send(info.reason); // client로 응답을 보내줌, 401: 허가되지 않음, 403: 금지
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'], // 원하는 정보만 가져오거나 가져오지 않겠다 / 현재: pw 빼고 다 가져오겠다
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: 'Followers',
          },
          {
            model: User,
            as: 'Followings',
          },
        ], // 가져올 정보중 뺄 것들
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
}); // 로그인 전략 실행

/* async - await: 비동기 프로그래밍, POST /user/ */
// POST /user
router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    // 가입 전에 중복확인, 입력한 계정이 존재하는지 찾아본다
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // 계정이 존재하면 403
    if (exUser) {
      return res.status(403).send('이미 사용 중인 계정 입니다.'); // return 붙여서 한번만 응답 할 수 있게 해준다 (router 종료)
    }
    // 가입한 데이터를 테이블에 추가한다
    const hashedPassword = await bcrypt.hash(req.body.password, 12); // 숫자가 높을 수록 보안수준 강화, 서버의 속도에 따라 적절한 숫자를 찾는 것이 좋다
    await User.create({
      email: req.body.email,
      password: hashedPassword, // $npm install bcrypt (비밀번호 암호화 라이브러리) / hash
      nickname: req.body.nickname,
    });
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060'); // 해당 포트만 허용하겠다
    // res.setHeader('Access-Control-Allow-Origin', '*'); // 모든 서버를 허용하겠다.
    res.status(201).send('OK'); //! 응답(res)이 2번이 가는경우 can't set headers already sent 에러메세지
  } catch (error) {
    console.error(error);
    next(error); // status 500 // next 통해서 err를 보낼 수 있다, error들이 한방에 처리가 된다
  }
});

// POST /user/logout
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('logout ok');
});

// 닉네임 변경하기
// PATCH /user/nickname
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname, // nickname을 front에서 제공한 nickname으로 변경
      },
      {
        where: { id: req.user.id }, // 남의 것이 아닌 나의 id의(조건)
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// PATCH /user/1/follow
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      res.status(403).send('없는 사람은 팔로우 할 수 없습니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE /user/1/follow
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      res.status(403).send('없는 사람은 언팔로우 할 수 없습니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE /user/follower/2
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      res.status(403).send('차단하려는 사람이 없습니다.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
