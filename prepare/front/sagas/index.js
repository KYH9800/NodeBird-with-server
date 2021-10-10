import { all, fork, call, put, takeLatest, throttle, delay } from 'redux-saga/effects'; // saga의 effects
import axios from 'axios'; // $npm install axios

// LOG_IN
function logInAPI(data) {
  return axios.post('/api/login', data); // 실제로 서버에 요청을 보냄
}
// 요청이 실패할 경우를 대비 try, catch를 사용
function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data); //! call은 동기 함수로 결과가 와야 실행된다
    yield delay(1000); // setTimeout 역할 (dummyData를 사용할 동안만 delay 사용)
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data, // 성공 결과의 data
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data, // 실패 결과는 err.response.data에 담겨있음
    });
  }
}

// LOG_OUT
function logOutAPI(/* generator 아님 */) {
  return axios.post('/api/logout'); // 실제로 서버에 요청을 보냄
}
// 요청이 실패할 경우를 대비 try, catch를 사용
function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000); // setTimeout 역할
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data, // 성공 결과의 data
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data, // 실패 결과는 err.response.data에 담겨있음
    });
  }
}

// ADD_POST
function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000); // setTimeout 역할
    yield put({
      type: 'ADD_POST_SUCCES',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}
// 여기가 event Listener 같은 역할은 한다
function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn); // takeLatest는 여러번 눌려도 앞것은 무시하고 마지막 것만 실행해준다
} // takeLeading은 앞에 것만 한번 실행해준다 (뒤에 것은 무시)
// yield takeEvery('LOG_IN_REQUEST', logIn); // takeEvery가 while문을 대체 할 수 있다.
// yield만 쓰면 한번만 동작하고 사라진다 하지만 while로 감싸주면 무한하게 사용 가능하다
// while (true) { yield take('LOG_IN_REQUEST', logIn); } // while take는 동기적으로 동작한다 또 직관적이지 않다
function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  yield throttle(5000, 'ADD_POST_REQUEST', addPost); // n초 동안은 한번만 요청이 간다 (throttle)
}

// '*' : generator - using yield
// rootSaga 하나 만들어 놓고 만들고싶은 비동기 액션을 하나씩 넣어준다
export default function* rootSaga() {
  yield all([
    fork(watchLogIn), // call
    fork(watchLogOut),
    fork(watchAddPost),
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
