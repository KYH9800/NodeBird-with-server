const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();
/* async - await: 비동기 프로그래밍, POST /user/ */
router.post('/', async (req, res) => {
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
      nickname: req.body.nickname,
      password: hashedPassword, // $npm install bcrypt (비밀번호 암호화 라이브러리)
    });
    res.status(201).send('OK'); //! 응답(res)이 2번이 가는경우 can't set headers already sent 에러메세지
  } catch (error) {
    console.error(error);
    next(error); // status 500 // next 통해서 err를 보낼 수 있다, error들이 한방에 처리가 된다
  }
});

module.exports = router;

// sequelize 공식문서
// https://sequelize.org/master/manual/model-querying-finders.html#-code-findone--code-

// 200 성공
// 300 리다이렉트
// 400 클라이언트 에러
// 500 서버 에러
