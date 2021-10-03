import React from "react"; // next는 이 구문이 필요없다(써도 상관은 없다)
// import Head from "next/head";
import AppLayout from "../components/AppLayout";
import Head from "next/head";

const Profile = () => {
  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <div>내 프로필</div>
    </AppLayout>
  );
};

export default Profile;
