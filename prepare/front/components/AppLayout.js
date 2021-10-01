import React from "react";
import PropTypes from "prop-types"; //! $npm install prop-types
import Link from "next/link";
// prepare/front/pages/에서 index.js, profile.js, signup.js에 공통으로 사용할 layout
const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/">
          <a>노드버드</a>
        </Link>
        <Link href="/profile">
          <a>프로팔</a>
        </Link>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </div>
      {children}
    </div>
  );
};

AppLayout.prototypes = {
  children: PropTypes.node.isRequired, // children은 node라는 type, react의 npde, 화면안에 그릴수 있는 모든 것들이 node, return 안에 들어가는 것들이 node
};

export default AppLayout;

// 1.
// $npm install next / $npm install next@9 [@version]
// $npm install react react-dom
// $npm install prop-types

// 2. 코드 규칙을 정해준다 (여러 개발자들의 규칙을 정해준다)
// $npm install --save-dev eslint
// $npm install --save-dev eslint-plugin-import
// $npm install --save-dev eslint-plugin-react-hooks
