import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// css
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
// components
import { addPost } from '../reducers/post';
import useInput from '../hooks/useInput'; // custom hooks

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef(); // 실제 DOM에 접근하기 위해 사용
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText(''); // 요청이가고 addPostDone이 true가 되면 그 때 비운다
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    console.log('onSubmit');
    dispatch(addPost(text)); // ADD_POST
  }, [text]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <FormStyle encType='multipart/form-data' onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder='어떤 신기한 일이 있었나요?' />
      <div>
        <input type='file' multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <ButtonFloat type='primary' htmlType='submit'>
          짹짹
        </ButtonFloat>
      </div>
      <div>
        {imagePaths.map((v) => (
          <DivInline key={v}>
            <ImgStyle src={v} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </DivInline>
        ))}
      </div>
    </FormStyle>
  );
};

export default PostForm;

const FormStyle = styled(Form)`
  margin: 10px 0 20px;
`;
const ButtonFloat = styled(Button)`
  float: right;
`;
const DivInline = styled.div`
  display: inline-block;
`;
const ImgStyle = styled.img`
  width: 200px;
`;
