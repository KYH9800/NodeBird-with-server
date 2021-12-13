import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unFollowLoading } = useSelector((state) => state.user);
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id, // mainPosts.User.id (/pages/index.js, mainPosts: /reducers/post.js)
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id, // mainPosts.User.id (/pages/index.js, mainPosts: /reducers/post.js)
      });
    }
  }, [isFollowing]);
  // 나의 게시물이면 null 값
  if (post.User.id === me.id) {
    return null;
  }

  return (
    <>
      <Button loading={followLoading || unFollowLoading} onClick={onClickButton}>
        {isFollowing ? '언팔로우' : '팔로우'}
      </Button>
    </>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
