// npde에서 제공하는 http module이 서버다
const express = require('express'); // express 내부적으로 http를 사용해서 서버를 돌릴 수 있다
const app = express();
const cors = require('cors'); // $npm install cors

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const db = require('./models');
const passportConfig = require('./passport');

//* promiss, 서버 실행할 때 db/sequelize 연결도 같이 해준다
// $npx sequelize db:create
// $npm i -D nodemon >> nodemon app.js 로 서버를 실행
// package.json - "scripts" { "dev": "nodemon app"}
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

//? CORS(Cross-origin resource sharing) 문제해결
const corsOptions = {
  origin: '*', // 'https://nodebird.com
  credentials: false, // default
};
app.use(cors(corsOptions));

passportConfig(); // passport

// routes의 req.body를 사용하기 위해 설정 (작성 위치 중요, get, use, listen위에 작성)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* router
app.get('/', (req, res) => {
  console.log(req.url, req.method);
  res.send('hello express');
});

app.get('/api', (req, res) => {
  console.log(req.url, req.method);
  res.send('hello api');
});

//* 가져오기
app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello 01' },
    { id: 2, content: 'hello 02' },
    { id: 3, content: 'hello 03' },
  ]);
});

app.use('/post', postRouter); // prefix
app.use('/user', userRouter);
// http://localhost:3065/
app.listen(3065, () => {
  console.log('서버 실행 중입니다.');
}); // 사용할 포트

// app.js를 node가 실행하면 http를 통해 server가 작동한다 / http가 server가 되는 것
// node는 javaScript RunTime이다

//! 응답을 안 보내면 특정 시간(30초 정도) 후에 브라우저가 자동으로 응답 실패로 처리한다.
//! res.end를 두번 사용하면 안된다

//? 기본 node http보다 코드를 깔끔하고 구조적으로 짤수 있는 express를 설치한다
//? $npm install express

/* 자주쓰는 것들
 * app.get : 가져오다
 * app.post : 생성하다
 * app.put : 전체 수정
 * app.delete : 제거
 * app.patch : 부분 수정 (닉네임 변경, 게시글 content 수정)
 * app.options : 찔러보기 - '나 요청 보낼 수 있어? 서버야, 보내면 받아줄거야?'
 * app.head : header만 가져오기(header/body-본문)
 */

// rest API list에 관한 문서는 Swagger를 사용해보는 것도 좋다
