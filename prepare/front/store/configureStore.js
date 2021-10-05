// configureStore.js (next redux)
import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import reducer
import reducer from "../reducers";

// configureStore 여기에서는 일반 redux와 비슷
const configureStore = () => {
  const middlewares = []; // 추후 saga || thunk 를 넣기 위한 배열 생성
  // 배포용일떄 ? devTool 연결 X : devTool 연결 O
  const enhancer = process.env.NODE_ENV === "production" ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer); // state와 reducer를 포함하는게 store
  return store;
};
// { debug: process.env.NODE_ENV === "development" }
const wrapper = createWrapper(configureStore, { debug: true }); // 두번째는 옵션 객체

export default wrapper;

//! reduxTools (no store found. make sure to follow the instructions.)
// $npm i redux-devtools-extension
