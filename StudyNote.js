//! prepare/front/store/configureStore.js
// (redux냐 mobx냐는 개발자 성향에 따라 소통 후 결정할 문제)
/* redux: 중앙 데이터 저장소
- 장점: 에러가 나도 추적이 가능하다. 앱이 안정적이다.
- 단점: code 양이 많아 진다. */

/* mobx: 코드량이 엄청 줄어드는 대신 실수하는 경우 트래킹이 힘들다. */

/* 기본적인 세팅 configureStore.js */
// 1. $npm install next-redux-wrapper
// 2. $npm install redux

/** redux의 원리와 불변성(Immutability)
 * [원리]
 * 데이터를 조회, 수정, 추가, 삭제도 하는데
 * type(action의 이름) action을 정의하고 reducer로 dispatch 시 data를 어떻게 바꿀지 정의한다.
 * action을 dispatch하여 중앙저장소의 데이터가 변한다.
 * action을 정의 >> reducer로 행위를 정의 >> dispatch로 action을 구현
 *
 * [불변성](Immutability)
 * reducer에서 return 시 return {...state, name: action.data} 이게 불변성이다.
 * javaScript에서는 {} === {} false다, const a = {}; const b = a; a === b // true
 * 참조관계 떄문에 ...state를 통해 객체를 항상 새로 만들어주어야 한다. */

//! redux-Saga
// '*' : generator - using yield
let i = 0;
const gen = function* () {
  while (true) {
    yield i++;
  }
};
const g = gen();

g.next(); // { value: 0 done: false }
g.next(); // { value: 1 done: false }
g.next(); // { value: 2 done: false }
g.next(); // { value: 3 done: false }
g.next(); // { value: 4 done: false }
g.next(); // { value: ... done: false }

const gen = function* () {
  console.log('one');
  yield 1;
  console.log('two');
  yield 2;
  console.log('three');
  yield 3;
  console.log('four');
  yield 4;
  console.log('five');
  yield 5;
  return 6;
};
const g = gen();

g.next(); // 'one' { value: 1, done: false }
g.next(); // 'two' { value: 2, done: false }
g.next(); // 'three' { value: 3, done: false }
g.next(); // 'four' { value: 4, done: false }
g.next(); // 'five' { value: 5, done: false }
g.next(); // { value: 6, done: true }
g.next(); // { value: undefinded, done: true }
