import React, { useEffect, useState, useCallback } from 'react'; // next는 이 구문이 필요없다(써도 상관은 없다)
import { useSelector } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import { END } from 'redux-saga';
import axios from 'axios';
import useSWR from 'swr';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

import wrapper from '../store/configureStore';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data); // swr

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  // data: success, falure, 둘 다 없으면 loading... / routes에서 params & wildeCard 위에 있어야 한다 (작동 흐름: 위에서 아래로, 왼쪽 > 오른쪽)
  const { data: followersData, error: followerError } = useSWR(
    `http://localhost:3065/user/followers?limit=${followersLimit}`,
    fetcher,
  ); // fetcher를 다른 걸로 바꾸면 graghQL도 쓸 수 있다
  const { data: followingsData, error: followingError } = useSWR(
    `http://localhost:3065/user/followings?limit=${followingsLimit}`,
    fetcher,
  );

  // me data 안에 id 값이 없으면 홈으로, 있으면 리스트 보이기
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  // 추가로 1개만 있는데 3개를 더 불러오는 것은 data 낭비, 해결방법: useEffect에 followersData의 id로 비교해서 기존 state에 concat하면 된다.
  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  if (!me) {
    return '내 정보 로딩중...';
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return '팔로잉/팔로워 로딩 중 에러가 발생합니다.';
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉"
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingsData && !followingError}
        />
        <FollowList
          header="팔로워"
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followersData && !followerError}
        />
      </AppLayout>
    </>
  );
};

// try SSR with share cookie
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  console.log('getServerSideProps start');
  console.log(req.headers);
  const cookie = req ? req.headers.cookie : ''; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
  axios.defaults.headers.Cookie = ''; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie; // 서버일때랑 cookie를 써서 요청을 보낼 때만 headers에 cookie를 넣어준다
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  console.log('getServerSideProps end');
  await store.sagaTask.toPromise(); // store/configureStore.js > store.sagaTask
}); // 이 부분이 Home 보다 먼저 실행됨

export default Profile;
