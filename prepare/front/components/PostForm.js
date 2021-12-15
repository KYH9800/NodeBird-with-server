import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// css
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
// components
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';
import useInput from '../hooks/useInput'; // custom hooks

const PostForm = () => {
  const { imagePaths, addPostDone, addPostLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef(); // 실제 DOM에 접근하기 위해 사용
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText(''); // 요청이가고 addPostDone이 true가 되면 그 때 비운다
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files); // 배열X, 유사배열
    const imageFormData = new FormData(); // 멀티파트 형식으로 서버에 보낼수 있다
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f); // key: 'image', value(값): f
    }); // key: 'image'와 routes/post.js에 router.post('./images', upload.array('image'))가 일치해야 그대로 받을 수가 있다
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    [],
  );

  return (
    <FormStyle encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <ButtonFloat type="primary" htmlType="submit" loading={addPostLoading}>
          짹짹
        </ButtonFloat>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <DivInline key={v}>
            <ImgStyle src={v} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
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
