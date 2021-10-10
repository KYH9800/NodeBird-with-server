import { HYDRATE } from 'next-redux-wrapper'; // SSR(Server Side Rendering)을 위함
import { combineReducers } from 'redux'; // combineReducers은 reducer 함수를 합쳐주는 역할
// spliting reducer
import user from './user';
import post from './post';

// async action creator(비동기) / redux-saga

// (이전상태, 액션) >> 다음 상태
const rootReducer = combineReducers({
  // HYDRATE를 위해 index reducer를 추가 (SSR을 위해 추가함)
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
