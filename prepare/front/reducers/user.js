import produce from 'immer';

export const initialState = {
  removeFollowersLoading: false, //* Remove Followers 시도중
  removeFollowersDone: false,
  removeFollowersError: null,
  loadFollowersLoading: false, //* user(Followers) 정보 가져오기 시도중
  loadFollowersDone: false,
  loadFollowersError: null,
  loadFollowingsLoading: false, //* user(Followings) 정보 가져오기 시도중
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadMyInfoLoading: false, //* user(MyInfo) 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,
  followLoading: false, //* 팔로우 시도중
  followDone: false,
  followError: null,
  unFollowLoading: false, //* 언팔로우 시도중
  unFollowDone: false,
  unFollowError: null,
  logInLoading: false, //* 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, //* 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, //* 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, //* 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {},
};
// REMOVE_FOLLOWERS
export const REMOVE_FOLLOWERS_REQUEST = 'REMOVE_FOLLOWERS_REQUEST';
export const REMOVE_FOLLOWERS_SUCCESS = 'REMOVE_FOLLOWERS_SUCCESS';
export const REMOVE_FOLLOWERS_FAILURE = 'REMOVE_FOLLOWERS_FAILURE';
// FOLLOWERS
export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';
// FOLLOWINGS
export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';
// 로그인 유지
export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';
// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// 로그아웃
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
// 회원가입
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
// 닉네임 변경
export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';
// 팔로우
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';
// 언팔로우
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';
// 게시글 추가, 삭제
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

// action creactor
export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //* REMOVE_FOLLOWERS
      case REMOVE_FOLLOWERS_REQUEST:
        draft.removeFollowersLoading = true;
        draft.removeFollowersDone = false;
        draft.removeFollowersError = null;
        break;
      case REMOVE_FOLLOWERS_SUCCESS:
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
        draft.removeFollowersLoading = false;
        draft.removeFollowersDone = true;
        break;
      case REMOVE_FOLLOWERS_FAILURE:
        draft.removeFollowersLoading = false;
        draft.removeFollowersError = action.error;
        break;
      //* FOLLOWERS
      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersDone = false;
        draft.loadFollowersError = null;
        break;
      case LOAD_FOLLOWERS_SUCCESS:
        draft.me.Followers = action.data;
        draft.loadFollowersLoading = false;
        draft.loadFollowersDone = true;
        break;
      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;
      //* FOLLOWINGS
      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsDone = false;
        draft.loadFollowingsError = null;
        break;
      case LOAD_FOLLOWINGS_SUCCESS:
        draft.me.Followings = action.data;
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsDone = true;
        break;
      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;
      //* user 정보 가져오기 시도중
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.me = action.data;
        draft.loadMyInfoDone = true;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      //* 팔로우 && 언팔로우
      case FOLLOW_REQUEST: // 팔로우
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data.UserId });
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      case UNFOLLOW_REQUEST: // 언팔로우
        draft.unFollowLoading = true;
        draft.unFollowDone = false;
        draft.unFollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unFollowLoading = false;
        draft.unFollowDone = true;
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
        break;
      case UNFOLLOW_FAILURE:
        draft.unFollowLoading = false;
        draft.unFollowError = action.error;
        break;
      //* 로그인
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data; // dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      //* 로그아웃
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logInDone = false;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        draft.me = null;
        break;
      //* 회원가입
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      //* 닉네임 변경
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.me.nickname = action.data.nickname; // 나의 닉네임을 입력한 닉네임으로 변경
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      //* 내 아이디로 게시물 추가
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      //* 내 아이디로 만든 게시물 삭제
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break; //! 성능에 문제가 생기면 unshift로 리펙토링
      default:
        break; // return state;
    }
  });

export default reducer;
