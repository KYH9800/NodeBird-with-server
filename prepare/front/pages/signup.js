import React, { useCallback, useEffect, useState } from 'react'; // next는 이 구문이 필요없다(써도 상관은 없다)
import Head from 'next/head';
import Router from 'next/router';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput'; //* customHook 적용하기

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError } = useSelector((state) => state.user);

  useEffect(() => {
    if (signUpDone) {
      Router.push('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput(''); // customHook
  const [nickname, onChangeNickname] = useInput(''); // customHook
  const [password, onChangePassword] = useInput(''); // customHook
  // useState
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  // 약관동의 Checkbox
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  // password와 passwordCheck가 같은지 검사
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password); // 비밀번호 일치 여부 확인
    },
    // eslint-disable-next-line comma-dangle
    [password],
  );

  const onChangeTerm = useCallback((e) => {
    console.log(e.target.checked);
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  // eslint-disable-next-line consistent-return
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log('server로 보낼 정보: ', email, nickname, password); //! server로 보낼 정보
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input type="password" name="user-password" value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <br />
          <Input
            type="password"
            name="user-password-check"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            관리자의 말을 잘 들을 것을 동의합니다.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <SubmitDiv>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
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
