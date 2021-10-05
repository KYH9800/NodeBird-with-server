import React, { useCallback } from "react";
import { Avatar, Button, Card } from "antd";
// react-redux
import { useDispatch } from "react-redux";
import { logoutAction } from "../reducers";

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutAction()); // 로그인 상태 false
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          트윗
          <br />0
        </div>,
        <div key="following">
          팔로잉
          <br />0
        </div>,
        <div key="follower">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>윤혁</Avatar>} title="KYH" />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
