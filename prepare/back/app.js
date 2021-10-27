// app.js를 node가 실행하면 http를 통해 server가 작동한다 / http가 server가 되는 것
// node는 javaScript RunTime이다
// http://localhost:3065/

const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method); // 요청: / GET, /favicon.ico GET
  // todo change 'express'
  if (req.method === 'GET') {
    if (req.url === '/api/posts') {
      // todo
    }
  } else if (req.method === 'POST') {
    if (req.url === '/api/post') {
      // todo
    }
  } else if (req.method === 'DELETE') {
    if (req.url === '/api/post') {
      // todo
    }
  }
  res.write('<h1>Hello node 1</h1>');
  res.write('<h2>Hello node 2</h2>');
  res.write('<h3>Hello node 3</h3>');
  res.write('<h4>Hello node 4</h4>');
  res.end('<h5>Hello node</h5>'); // res(응답): end 마지막에 쓰는 것
});
server.listen(3065, () => {
  console.log('서버 실행 중');
}); // 사용할 포트

//! 응답을 안 보내면 특정 시간(30초 정도) 후에 브라우저가 자동으로 응답 실패로 처리한다.
//! res.end를 두번 사용하면 안된다

//? 기본 node http보다 코드를 깔끔하고 구조적으로 짤수 있는 express를 설치한다
//? $npm install express
