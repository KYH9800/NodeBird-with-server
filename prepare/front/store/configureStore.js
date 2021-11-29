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
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
}); // 두번째는 옵션 객체

export default wrapper;
