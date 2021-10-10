// mainPosts: [dummy data {...}, {...}, {...},]
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '고윤혁',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: '우와 더미 데이터다~!!',
        },
        {
          User: {
            nickname: 'hero',
          },
          content: '진짜 데이터가 담긴 API를 얼른 써보고 싶어요~',
        },
      ],
    },
  ],
  imagePaths: [], // 이미지 업로드 할 때 이미지 경로들이 여기에 저장
  postAdded: false, // 게시글 추가가 완료가 됬을 때 true로 변한다
};
// action을 정의
const ADD_POST = 'ADD_POST';
// action 객체
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '더미 데이터 입니다.',
  User: {
    id: 1,
    nickname: '혁이',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
