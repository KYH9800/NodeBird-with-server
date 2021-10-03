import React from "react"; // next는 이 구문이 필요없다(써도 상관은 없다)
// import Head from "next/head";
import AppLayout from "../components/AppLayout";
import Head from "next/head";

const Signup = () => {
  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <div>회원가입 페이지</div>
    </AppLayout>
  );
};

export default Signup;
