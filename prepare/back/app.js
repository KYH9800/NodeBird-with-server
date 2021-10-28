const express = require('express');

const app = express();

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

//* 생성하기
app.post('/api/post', (req, res) => {
  res.json({ id: 1, content: 'hello 01' });
});

//* 삭제하기
app.delete('/api/post', (req, res) => {
  // todo
});

// http://localhost:3065/
app.listen(3065, () => {
  console.log('서버 실행 중');
}); // 사용할 포트

// app.js를 node가 실행하면 http를 통해 server가 작동한다 / http가 server가 되는 것
// node는 javaScript RunTime이다

//! 응답을 안 보내면 특정 시간(30초 정도) 후에 브라우저가 자동으로 응답 실패로 처리한다.
//! res.end를 두번 사용하면 안된다

//? 기본 node http보다 코드를 깔끔하고 구조적으로 짤수 있는 express를 설치한다
//? $npm install express
