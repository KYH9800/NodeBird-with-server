/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
// configureStore.js (next redux)
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// redux-Saga
import createSagaMiddleware from 'redux-saga';
// import reducer
import reducer from '../reducers';
import rootSaga from '../sagas';

// github 참조
// middleware는 화살표를 항상 3개 갖으면 된다 (3단 고차함수)
const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log('loggerMiddleware(redux-thunk): ', action);
    return next(action);
  };

// configureStore 여기에서는 일반 redux와 비슷
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware(); // redux-saga
  const middlewares = [sagaMiddleware, loggerMiddleware]; // 추후 saga || thunk 를 넣기 위한 배열 생성
  // 배포용일떄 ? devTool 연결 X : devTool 연결 O
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer); // state와 reducer를 포함하는게 store
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
// { debug: process.env.NODE_ENV === "development" }
const wrapper = createWrapper(configureStore, { debug: true }); // 두번째는 옵션 객체

export default wrapper;

//! reduxTools (no store found. make sure to follow the instructions.)
// $npm i redux-devtools-extension

//* redux-thunk
// $npm install redux-thunk
//! $npm rm redux-thunk (redux-thunk는 지워주자)

/* npm install redux-saga
* Redux-Saga
! - Click이 여러번 발생해도 마직막 클릭만 요청을 보낸다
! - 딜레이 되는 부분을 제공하여 편리하다
! - Redux-Saga-throttle로 스크롤 시 수없이 가는 요청을 몇번 허용할지 제한이 가능하다
! - Saga에서 제공하는 부분이 편리하므로 redux구현 시 복잡함에 따라 Saga 사용이 좋다
*/
