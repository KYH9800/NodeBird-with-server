// npde에서 제공하는 http module이 서버다
const express = require('express'); // express 내부적으로 http를 사용해서 서버를 돌릴 수 있다
const app = express();
const cors = require('cors'); // $npm install cors
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('dotenv').config(); // dotenv
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp'); // morgan에서 production 할 때는 hpp와 helmet은 필수
const helmet = require('helmet');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');

const db = require('./models');
const passportConfig = require('./passport');

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

db.sequelize.sync({
  alter: true,
}); // sequelize model sync() 수정하기

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined')); // 요청과 응답을 기록하는 모듈 (production)
  app.use(hpp()); // 보안에 도움되는 패키지
  app.use(helmet()); // 보안에 도움되는 패키지
} else {
  app.use(morgan('dev')); // 요청과 응답을 기록하는 모듈 (development)
}

const corsOptions = {
  origin: ['http://localhost:3060', 'nodebird.com'], // 'https://nodebird.com or "true"
  credentials: true, // default: false
};
app.use(cors(corsOptions));

passportConfig(); // passport

// routes의 req.body를 사용하기 위해 설정 (작성 위치 중요, get, use, listen위에 작성)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIESCRET)); // dotenv
app.use(session({ saveUninitialized: false, resave: false, secret: process.env.COOKIESCRET })); // dotenv
app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static(path.join(__dirname, 'uploads'))); // ('/'): http://localhost:3065/

//* router
app.get('/', (req, res) => {
  console.log(req.url, req.method);
  res.send('hello express');
});

app.use('/post', postRouter); // prefix
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

// app.use((err, req, res, next) => {...}); error처리 미들웨어

// http://localhost:3065/
app.listen(80, () => {
  console.log('서버 실행 중입니다.');
}); // 사용할 포트

//* promiss, 서버 실행할 때 db/sequelize 연결도 같이 해준다
// $npx sequelize db:create
// $npm i -D nodemon >> nodemon app.js 로 서버를 실행
// package.json - "scripts" { "dev": "nodemon app"}

/* 자주쓰는 것들
 * app.get : 가져오다
 * app.post : 생성하다
 * app.put : 전체 수정
 * app.delete : 제거
 * app.patch : 부분 수정 (닉네임 변경, 게시글 content 수정)
 * app.options : 찔러보기 - '나 요청 보낼 수 있어? 서버야, 보내면 받아줄거야?'
 * app.head : header만 가져오기(header/body-본문)
 */

// #npm install morgan: 요청과 응답을 기록하는 모듈
