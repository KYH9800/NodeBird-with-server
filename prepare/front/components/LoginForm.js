import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useDispatch()
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components'; // 태그 안에 객체 생성 뒤 style을 설정하면 렌더링 시 새로운 객체로 인식한다 때문에 styled-components 사용
//* customHook 적용하기
import useInput from '../hooks/useInput'; // 패턴이 비슷한데 조금씩 다른 것들 커스텀 훅으로 처리할 수 있다
import { loginRequestAction } from '../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  // onFinish은 자동으로 e.preventDefault() 가 적용되어 있다
  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]); // 해당 값이 변할 때 함수를 기억

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;

// styled-components
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
const FormWrapper = styled(Form)`
  padding: 10px;
`;
