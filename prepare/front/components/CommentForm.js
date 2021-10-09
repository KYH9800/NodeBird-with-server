import React, { useCallback } from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
// css
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput("");

  const onSumbitComment = useCallback(() => {
    console.log(post.id, commentText);
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

CommentForm.PropTypes = {
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
