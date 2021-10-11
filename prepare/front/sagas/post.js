import { all, fork, delay, throttle, call } from '@redux-saga/core/effects';
import axios from 'axios';

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

function* watchAddPost() {
  yield throttle(5000, 'ADD_POST_REQUEST', addPost); // n초 동안은 한번만 요청이 간다 (throttle)
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
