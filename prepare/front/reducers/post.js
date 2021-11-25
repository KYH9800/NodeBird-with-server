import produce from 'immer'; // $npm install immer
// mainPosts: [ {...}, {...}, {...}, ] // Dummy Data
export const initialState = {
  mainPosts: [], // Dummy Data
  imagePaths: [], // 이미지 업로드 할 때 이미지 경로들이 여기에 저장
  hasMorePosts: true, // 가져오려는 시도
  // 게시글을 불러올때(무한 스크롤)
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  // 게시글을 추가 할 때
  addPostLoading: false, // 게시글 추가가 완료가 됬을 때 true로 변한다
  addPostDone: false,
  addPostError: null,
  // 게시글을 삭제
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  // 댓글 작성
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

// 처음에 화면을 로딩하는 action
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

// action을 정의
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
// 게시물 삭제
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';
// 댓글 요청, 성공, 에러
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// action 객체
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// reducer: 이전 상태를 액션을 통해 다음 상태를 만들어내는 함수(단, 불변성은 지키면서)
// immer가 알아서 불변성을 지키면서 다음 상태로 만들어준다
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //* 게시글 불러오기(Infinite Scroll)
      case LOAD_POSTS_REQUEST:
        console.log('LOAD_POSTS_REQUEST');
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts); // 기존 data + dummy 10개
        draft.hasMorePosts = draft.mainPosts.length < 50; // 50개 보다 많아지면 false
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      //* 게시물 추가
      case ADD_POST_REQUEST:
        console.log('ADD_POST_REQUEST');
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        console.log('ADD_POST_SUCCESS');
        draft.mainPosts.unshift(action.data);
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      //* 게시물 삭제
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        // 지우려는 것만 지우고 나머진 남겨둔다
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      //* 댓글 추가
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId); //! 성능에 문제가 생기면 unshift로 리펙토링
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        // };
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break; // return state;
    }
  });

export default reducer;
