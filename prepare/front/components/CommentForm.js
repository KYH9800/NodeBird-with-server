import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// redux
import { useDispatch, useSelector } from 'react-redux';
// css
import { Button, Form, Input } from 'antd';
// reducer
import { ADD_COMMENT_REQUEST } from '../reducers/post';
// custom hooks
import useInput from '../hooks/useInput';

// eslint-disable-next-line react/prop-types
const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSumbitComment = useCallback(() => {
    console.log(post.id, commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText]);

  return (
    <Form onFinish={onSumbitComment}>
      CommentForm
      <FormItem>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <CommentButton type="primary" htmlType="submit" loading={addCommentLoading}>
          삐약
        </CommentButton>
      </FormItem>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;

const FormItem = styled(Form.Item)`
  position: relative;
  margin: 0px;
`;
const CommentButton = styled(Button)`
  position: absolute;
  right: 0px;
  bottom: -40px;
  z-index: 1;
`;
