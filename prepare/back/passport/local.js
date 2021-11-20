// local login 전략
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // dispatch({email}) > data(reducer, saga) > req.body.email
        passwordField: 'password', // dispatch({password}) > data(reducer, saga) > req.body.password
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email }, // email: email
          });
          if (!user) {
            return done(null, false, { reason: '존재하지 않는 사용자 입니다.' }); // server-err, 성공여부, client-err
          } // client failure
          const result = await bcrypt.compare(password, user.password); // 입력한 password, db에 저장된 password - 일치하면 true
          if (result) {
            return done(null, user); // email 있고 password 일치하면, client success
          }
          return done(null, false, { reason: '비밀번호가 틀렸습니다.' }); // client failure, 사용자 정보가 일치하지 않으면
        } catch (error) {
          console.error(error); // server failure
          return done(error);
        } // 비동기 요청하면 server 에라가 발생할 수 있다. 때문에 try{...}catch{...} 사용
      }
    )
  );
};
