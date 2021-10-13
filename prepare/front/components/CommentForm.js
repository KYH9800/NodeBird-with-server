import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
// redux
import { useDispatch, useSelector } from 'react-redux';
// css
import { Button, Form, Input } from 'antd';
// reducer
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentDone } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSumbitComment = useCallback(() => {
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
        <CommentButton type="primary" htmlType="submit">
          삐약
        </CommentButton>
      </FormItem>
    </Form>
  );
};

CommentForm.ropTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;

const FormItem = styled(Form.Item)`
  position: relative;
  margin: 0px;
  margin-bottom: 40px;
`;
const CommentButton = styled(Button)`
  position: absolute;
  bottom: -40px;
  right: 0px;
`;
