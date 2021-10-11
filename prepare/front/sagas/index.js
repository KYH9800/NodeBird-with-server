import { all, fork } from 'redux-saga/effects'; // saga의 effects
// import components
import userSaga from './user';
import postSaga from './post';

// '*' : generator - using yield
// rootSaga 하나 만들어 놓고 만들고싶은 비동기 액션을 하나씩 넣어준다
export default function* rootSaga() {
  yield all([
    fork(userSaga), // call
    fork(postSaga),
  ]);
} // all은 배열을 받고 배열안에 받은 것들을 한방에 실행해준다

// yield value는 value로 설정한 값을 반환하고 없으면 undefinded
// func.next()로 done이 true가 될 때까지 호출 (한번에 실행되지 않음 yield에서 멈춤)
// 무한의 개념이 표현 가능하다

//? fork는 비동기 함수를 호출한다 (non-blocking)
//? call은 동기 함수를 호출한다 (blocking)

//? throttling과 debouncing
/* throttling: 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
- 스크롤에 쓰이는 편, 검색 사용시 e.target.value 에 찍히는 모든 과정의 글자가 다 나온다 */
/* debouncing: 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것
- 검색 할 때 단어가 완성된 것을 보여주는 것 */
