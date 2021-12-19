import { HYDRATE } from 'next-redux-wrapper'; // SSR(Server Side Rendering)을 위함
import { combineReducers } from 'redux'; // combineReducers은 reducer 함수를 합쳐주는 역할
// spliting reducer
import user from './user';
import post from './post';

// async action creator(비동기) / redux-saga

// (이전상태, 액션) >> 다음 상태
// HYDRATE를 위해 index reducer를 추가 (SSR을 위해 추가함)
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;

/* 이걸 확장 가능하게 구조화한 것이 위의 코드
  const rootReducer = combineReducers({
    user,
    post,
  }); 
 */
