import React from "react"; // next는 이 구문이 필요없다(써도 상관은 없다)
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Home = () => {
  // todo
  return (
    // AppLayout으로 감싸진 태그가 children이다
    <AppLayout>
      <Head>NodeBird</Head>
      <div>Hello, Next</div>
    </AppLayout>
  );
};

export default Home;

// $npm install next / $npm install next@9 [@version]
// $npm install react react-dom
