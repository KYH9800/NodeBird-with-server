import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment'; // 날짜 라이브러리(npmtrans에서 추이 파악/dayjs...)
import 'moment/locale/ko'; // 한글로 변환
// css
import { Avatar, Button, Card, Popover, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import styled from 'styled-components';
// components
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
// reducer action
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
  UPDATE_POST_REQUEST,
} from '../reducers/post';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state) => state.user.me?.id);
  const [editMode, setEditMode] = useState(false);

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangePost = useCallback(
    (editText) => () => {
      dispatch({
        type: UPDATE_POST_REQUEST,
        data: {
          PostId: post.id,
          content: editText,
        },
      });
    },
    [post],
  );

  const onLike = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onUnLike = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers.find((v) => v.id === id);
  return (
    <MainDiv>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike} />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    {!post.RetweetId && <Button onClick={onClickUpdate}>수정</Button>}
                    <Button type="danger" onClick={onRemovePost} loading={removePostLoading}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗 하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <MomentDiv>{moment(post.createAt).format('YYYY년.MMMM.DD일 작성됨')}</MomentDiv>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={
                <PostCardContent
                  postData={post.Retweet.content}
                  onCancelUpdate={onCancelUpdate}
                  onChangePos={onChangePost}
                />
              }
            />
          </Card>
        ) : (
          <>
            <MomentDiv>{moment(post.createAt).format('YYYY년.MMMM.DD일 작성됨')}</MomentDiv>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={
                <PostCardContent
                  editMode={editMode}
                  onCancelUpdate={onCancelUpdate}
                  postData={post.content}
                  onChangePost={onChangePost}
                />
              }
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={`/user/${item.User.id}`} prefetch={false}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </MainDiv>
  );
};

//! err: Warning: Failed prop type: Invalid prop `post.id` of type `string` supplied to `PostCard`, expected `number`.
// id: PropTypes.arrayOf(PropTypes.object), // error에 의해 제거
// UserId: PropTypes.number,
PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;

const MainDiv = styled.div`
  margin-bottom: 20px;
`;
const MomentDiv = styled.div`
  float: right;
`;
