//! _app.js는 pages들의 공통 부분입니다
import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
// { Component } 는 index.js, profile.js, signup.js의 공통의 return component를 받아온다
const NodeBird = ({ Component }) => {
  return (
    <>
      <div>공통메뉴</div>
      <Component />
    </>
  );
}; // index.js 의 부모 component

// 안전성을 위해 점검 해주는 것이 좋다
NodeBird.PropTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default NodeBird;
