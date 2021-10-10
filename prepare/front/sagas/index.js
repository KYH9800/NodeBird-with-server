import { all, fork, call, take, put } from 'redux-saga/effects'; // saga의 effects
import axios from 'axios'; // $npm install axios

// LOG_IN
function logInAPI(data) {
  return axios.post('/api/login', data); // 실제로 서버에 요청을 보냄
}
// 요청이 실패할 경우를 대비 try, catch를 사용
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data); //! call은 동기 함수로 결과가 와야 실행된다
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
    const result = yield call(logOutAPI); //! call은 동기 함수로 결과가 와야 실행된다
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
    const result = yield call(addPostAPI, action.data);
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

function* watchLogIn() {
  yield take('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  yield take('ADD_POST_REQUEST', addPost);
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

//* fork는 비동기 함수를 호출한다 (non-blocking)
//* call은 동기 함수를 호출한다 (blocking)
