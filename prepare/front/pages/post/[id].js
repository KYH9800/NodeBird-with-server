// dynamic routing - post/[id].js
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  // if (router.isFallback) {
  //   return <div>로딩중...</div>;
  // } // fallback: true in getStaticPaths function

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://coding-factory.site/favicon.ico'}
        />
        <meta property="og:url" content={`https://coding-factory.site/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};
/*
export async function getStaticPaths() {
  const result = await axios.get('');
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    fallback: true, // true: 로딩중.. 이 후 SSR, false: 다른 페이지를 불러 올 때 에러가 안뜬다
  };
}
*/
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_POST_REQUEST,
    data: params.id,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Post;
