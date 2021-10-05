//! _app.js는 pages들의 공통 부분입니다
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import wrapper from "../store/configureStore";

// { Component } 는 index.js, profile.js, signup.js의 공통의 return component를 받아온다
const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
}; // index.js 의 부모 component

// 안전성을 위해 점검 해주는 것이 좋다
NodeBird.PropTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
