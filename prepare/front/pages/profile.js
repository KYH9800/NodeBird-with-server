import React from 'react'; // next는 이 구문이 필요없다(써도 상관은 없다)
// import Head from "next/head";
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
// Form을 만들 때 ReactForm 라이브러리를 사용하는 것이 좋다
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  // DummyData
  const followingList = [
    { nickname: '고윤혁' },
    { nickname: '제니' },
    { nickname: '까오니' },
    { nickname: '미주' },
    { nickname: '노드' },
    { nickname: '제로초' },
    { nickname: '사샤' },
    { nickname: '골드런' },
    { nickname: '제임스' },
  ];
  const followerList = [
    { nickname: '고윤혁' },
    { nickname: '제니' },
    { nickname: '까오니' },
    { nickname: '미주' },
    { nickname: '노드' },
    { nickname: '제로초' },
    { nickname: '사샤' },
    { nickname: '골드런' },
    { nickname: '제임스' },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉 목록' data={followingList} />
        <FollowList header='팔로워 목록' data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
