import produce from 'immer'; // $npm install immer
// mainPosts: [ {...}, {...}, {...}, ] // Dummy Data
export const initialState = {
  mainPosts: [], // Dummy Data
  singlePost: null, // 게시글 하나만 불러올때
  imagePaths: [], // 이미지 업로드 할 때 이미지 경로들이 여기에 저장
  hasMorePosts: true, // 가져오려는 시도
  // like
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  // unlike
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  // 게시글 불러오기(SSR-ServerSideProps)
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
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
  // 이미지 업로드
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  // Retweet
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};
// UPLOAD_IMAGES
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';
// LIKE
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';
// UNLIKE
export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';
// 게시글 하나만 불러올때
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';
// 처음에 화면을 로딩하는 action
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';
// 특정 한명의 사용자 게시글들을 요청
export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';
// 특정 해시태그를 가진 게시글들(검색기능을 위함)
export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';
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
// REMOVE_IMAGE
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
// RETWEET
export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// reducer: 이전 상태를 액션을 통해 다음 상태를 만들어내는 함수(단, 불변성은 지키면서)
// immer가 알아서 불변성을 지키면서 다음 상태로 만들어준다
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //* RETWEET
      case RETWEET_REQUEST:
        console.log('RETWEET_REQUEST');
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      case RETWEET_SUCCESS: {
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      }
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = action.error;
        break;
      //* REMOVE_IMAGE
      case REMOVE_IMAGE: // 이미지는 서버에서 잘 안지운다(자원이라서), 때문에 case가 한개
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      //* UPLOAD_IMAGES
      case UPLOAD_IMAGES_REQUEST:
        console.log('UPLOAD_IMAGES_REQUEST');
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      //* LIKE
      case LIKE_POST_REQUEST:
        console.log('LIKE_POST_REQUEST');
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId }); // 좋아요 누른 사람중에 내가 추가
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      //* UNLIKE
      case UNLIKE_POST_REQUEST:
        console.log('UNLIKE_POST_REQUEST');
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId); // 좋아요 누른 사람중에 내가 빠짐(filter)
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      //* 게시글(한개) 불러오기
      case LOAD_POST_REQUEST:
        console.log('LOAD_POST_REQUEST');
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      //* 특정 한명의 사용자 게시글들을 요청
      //* 특정 해시태그를 가진 게시글들(검색기능을 위함)
      //* 게시글 불러오기(Infinite Scroll)
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_POSTS_REQUEST:
        console.log('LOAD_POSTS_REQUEST');
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10; // 10개의 게시글을 불러온다
        break;
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
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
        draft.imagePaths = []; // 사진을 올리면 imagePath 초기화
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
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
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
