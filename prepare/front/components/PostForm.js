import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// css
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
// components
import { addPost } from '../reducers/post';

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef(); // 실제 DOM에 접근하기 위해 사용
  const [text, setText] = useState('');

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    console.log('onSubmit');
    dispatch(addPost); // ADD_POST
    setText(''); // 쨱쨱을 click 시 작성했던 글은 textArea에서 없어진다
  }, []);

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
