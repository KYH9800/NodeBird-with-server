import React, { useCallback, useState } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import styled from "styled-components"; // 태그 안에 객체 생성 뒤 style을 설정하면 렌더링 시 새로운 객체로 인식한다 때문에 styled-components 사용

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 패턴이 비슷한데 조금씩 다른 것들 커스텀 훅으로 처리할 수 있다
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  return (
    <Form>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

export default LoginForm;

// styled-components
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;