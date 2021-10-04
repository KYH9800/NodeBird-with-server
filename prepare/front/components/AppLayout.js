//! AppLayout.js는 일부분이 공통인 것들
import React, { useState } from "react";
import PropTypes from "prop-types"; //! $npm install prop-types
import Link from "next/link";
import { Input, Menu, Row, Col } from "antd";
import {} from "@ant-design/icons";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

// prepare/front/pages/에서 index.js, profile.js, signup.js에 공통으로 사용할 layout
const AppLayout = ({ children }) => {
  const [current, setCurrent] = useState(false);

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  // 반응형 그리드 xs: 모바일, sm: 태블릿, md: 작은 데스크탑
  return (
    <div>
      <div>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item>
            <Link href="/">
              <a>노드버드</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/profile">
              <a>프로필</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Input.Search enterButton style={{ verticalAlign: "middle" }} />
          </Menu.Item>
          <Menu.Item>
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </Menu.Item>
        </Menu>
        <Row gutter={10}>
          <Col xs={24} sm={6} md={6}>
            왼쪽 메뉴
          </Col>
          <Col xs={24} sm={12} md={12}>
            {children}
          </Col>
          <Col xs={24} sm={6} md={6}>
            <a href="https://github.com/ko7452" target="_blank" rel="noreferrer noopener">
              Made by Ko_YunHyeok
            </a>
          </Col>
        </Row>
      </div>
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

// 3. antd && styled-components
// $npm install antd styled-components @ant-design/icons
// antd 사용 시 @ant-design/icons도 같이 해준다
