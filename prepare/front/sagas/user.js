import { all, fork, delay, put, takeLatest, call } from '@redux-saga/core/effects';
import axios from 'axios';
// import reducer
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from '../reducers/user';

// LOG_IN
function logInAPI(data) {
  return axios.post('/api/login', data); // 실제로 서버에 요청을 보냄
}
// 요청이 실패할 경우를 대비 try, catch를 사용
function* logIn(action) {
  try {
    console.log('saga login');
    // const result = yield call(logInAPI, action.data); //! call은 동기 함수로 결과가 와야 실행된다
    yield delay(1000); // setTimeout 역할 (dummyData를 사용할 동안만 delay 사용)
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data, // 성공 결과의 data
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data, // 실패 결과는 err.response.data에 담겨있음
    });
  }
}

// LOG_OUT
function logOutAPI(/* generator 아님 */) {
  return axios.post('/api/logout'); // 실제로 서버에 요청을 보냄
}
// 요청이 실패할 경우를 대비 try, catch를 사용
function* logOut(action) {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000); // setTimeout 역할
    yield put({
      type: LOG_OUT_SUCCESS,
      data: action.data, // 성공 결과의 data
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      data: err.response.data, // 실패 결과는 err.response.data에 담겨있음
    });
  }
}

// SIGN_UP
function signUpAPI() {
  return axios.post('/api/signup');
}

function* signUp(action) {
  try {
    // const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

// FOLLOW
function followAPI() {
  return axios.post('/api/follow');
}

function* follow(action) {
  try {
    // const result = yield call(followAPI);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// UNFOLLOW
function unfollowAPI() {
  return axios.post('/api/unfollow');
}

function* unfollow(action) {
  try {
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// 여기가 event Listener 같은 역할은 한다
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn); // takeLatest는 여러번 눌려도 앞것은 무시하고 마지막 것만 실행해준다
} // takeLeading은 앞에 것만 한번 실행해준다 (뒤에 것은 무시)
// yield takeEvery('LOG_IN_REQUEST', logIn); // takeEvery가 while문을 대체 할 수 있다.
// yield만 쓰면 한번만 동작하고 사라진다 하지만 while로 감싸주면 무한하게 사용 가능하다
// while (true) { yield take('LOG_IN_REQUEST', logIn); } // while take는 동기적으로 동작한다 또 직관적이지 않다
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp), fork(watchFollow), fork(watchUnFollow)]);
}
