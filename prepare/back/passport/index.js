// passport 설정 파일
const passport = require('passport'); // $npm install passport
const local = require('./local'); // $npm install passport-local
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // session에 다 들고 있기가 무거우니까 정보중에서 cookie와 묶어줄 1번만 저장
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // 전달 받은 id를 통해서 user 정보를 가져옴 // req.user
    } catch (err) {
      console.error(err);
      done(err);
    }
  });
  local();
};
// app.js의 라우터 user.js의  req.login이 실행되면, /passport/index.js 동시에 실행됨
// passport.serializeUser((user, done) => {...} // req.login의 user가 첫 인자로 들어감
