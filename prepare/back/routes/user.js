const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');

const router = express.Router();
// err: 서버에러, user: 성공객체, info: 정보 // middleware 확장
router.post('/login', (req, res, next) => {
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
      // res.setHeader('Cookie', 'cS34RtY2'); // cookie가 랜덤한 문자열을 보냄, session과도 연결해줌
      return res.status(200).json(user);
    });
  })(req, res, next);
}); // 로그인 전략 실행

/* async - await: 비동기 프로그래밍, POST /user/ */
router.post('/', async (req, res, next) => {
  try {
    // 가입 전에 중복확인, 입력한 계정이 존재하는지 찾아본다
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
      include: [{ model: Posts }],
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

router.post('/user/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('logout ok');
});

module.exports = router;

// sequelize 공식문서
// https://sequelize.org/master/manual/model-querying-finders.html#-code-findone--code-

// 200 성공
// 300 리다이렉트
// 400 클라이언트 에러
// 500 서버 에러
