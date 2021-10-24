import React, { useEffect } from 'react'; // next는 이 구문이 필요없다(써도 상관은 없다)
import { useSelector } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';

// Form을 만들 때 ReactForm 라이브러리를 사용하는 것이 좋다
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  // me data 안에 id 값이 없으면 홈으로, 있으면 리스트 보이기
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
