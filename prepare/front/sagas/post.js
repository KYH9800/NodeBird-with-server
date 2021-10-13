import { all, fork, delay, throttle, call } from '@redux-saga/core/effects';
import axios from 'axios';
// import reducer
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post';

// ADD_POST
function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000); // setTimeout 역할
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

// ADD_COMMENT
function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000); // setTimeout 역할
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost); // n초 동안은 한번만 요청이 간다 (throttle)
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment); // n초 동안은 한번만 요청이 간다 (throttle)
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
