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

/*
* Redux-thunk
  - 비동기 action 하나에 동기 action을 여러개 dispatch 할 수 있다
  - 요청, 성공, 실패 action(동기적)을 여러번 실행 할 수 있다
! - Click이 여러번 되는 경우 요청이 누른 횟수만큼 간다
! - 딜레이되는 부분을 직접 구현해야된다. 하지않을 경우 수없이 요청이 가므로 셀프 디도스 공격이 되버린다.
* Redux-Saga
! - Click이 여러번 발생해도 마직막 클릭만 요청을 보낸다
! - 딜레이 되는 부분을 제공하여 편리하다
! - Redux-Saga-throttle로 스크롤 시 수없이 가는 요청을 몇번 허용할지 제한이 가능하다
! - Saga에서 제공하는 부분이 편리하므로 redux구현 시 복잡함에 따라 Saga 사용이 좋다
*/
