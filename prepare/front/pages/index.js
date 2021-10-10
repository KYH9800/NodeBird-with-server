import React from 'react'; // next는 이 구문이 필요없다(써도 상관은 없다)
import { useSelector } from 'react-redux';
// import Head from "next/head";
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  // 아래의 mainPosts.map에서 key 값은 바뀌는 값이면서 고유의 값인 post.id를 넣어준다
  return (
    // AppLayout으로 감싸진 태그가 children이다
    <>
      <Head>
        <title>NodeBird</title>
      </Head>
      <AppLayout>
        {isLoggedIn && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export default Home;

// $npm install next / $npm install next@9 [@version]
// $npm install react react-dom
