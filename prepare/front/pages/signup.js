import React, { useCallback, useState } from "react"; // next는 이 구문이 필요없다(써도 상관은 없다)
// import Head from "next/head";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Button, Checkbox, Form, Input } from "antd";
import styled from "styled-components";
//* customHook 적용하기
import useInput from "../hooks/useInput";

const Signup = () => {
  const [id, onChangeId] = useInput(""); // customHook
  const [nickname, onChangeNickname] = useInput(""); // customHook
  const [password, onChangePassword] = useInput(""); // customHook
  // useState
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  // 약관동의 Checkbox
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  // password와 passwordCheck가 같은지 검사
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password); // 비밀번호 일치 여부 확인
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    console.log(e.target.checked);
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log("server로 보낼 정보: ", id, nickname, password); //! server로 보낼 정보
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <br />
          <Input value={passwordCheck} required onChange={onChangePasswordCheck} />
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            관리자의 말을 잘 들을 것을 동의합니다.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <SubmitDiv>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </SubmitDiv>
      </Form>
    </AppLayout>
  );
};

export default Signup;

// styled-components
const ErrorMessage = styled.div`
  color: red;
`;
const SubmitDiv = styled.div`
  margin-top: 10px;
`;
