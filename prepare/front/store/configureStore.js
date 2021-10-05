// configureStore.js (next redux)
import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
// import reducer
import reducer from "../reducers";

// configureStore 여기에서는 일반 redux와 비슷
const configureStore = () => {
  const store = createStore(reducer); // state와 reducer를 포함하는게 store
  store.dispatch({ type: "CHANGE_NICKNAME", data: "boogiKo" });
  return store;
};
// { debug: process.env.NODE_ENV === "development" }
const wrapper = createWrapper(configureStore, { debug: true }); // 두번째는 옵션 객체

export default wrapper;
