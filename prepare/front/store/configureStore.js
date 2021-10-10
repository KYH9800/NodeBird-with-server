// configureStore.js (next redux)
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// redux-thunk
import thunkMiddleware from 'redux-thunk';
// import reducer
import reducer from '../reducers';

// github 참조
// middleware는 화살표를 항상 3개 갖으면 된다 (3단 고차함수)
const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log('loggerMiddleware(redux-thunk): ', action);
    // thunk는 action이 함수인 경우
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };

// configureStore 여기에서는 일반 redux와 비슷
const configureStore = () => {
  const middlewares = [thunkMiddleware, loggerMiddleware]; // 추후 saga || thunk 를 넣기 위한 배열 생성
  // 배포용일떄 ? devTool 연결 X : devTool 연결 O
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer); // state와 reducer를 포함하는게 store
  return store;
};
// { debug: process.env.NODE_ENV === "development" }
const wrapper = createWrapper(configureStore, { debug: true }); // 두번째는 옵션 객체

export default wrapper;

//! reduxTools (no store found. make sure to follow the instructions.)
// $npm i redux-devtools-extension

//* redux-thunk
// $npm install redux-thunk
