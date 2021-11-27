import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWERS_REQUEST } from '../reducers/user';

// <List /> antd 공식문서에 사용법 나와 있음(참고하기)
const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();
  const onCancle = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWERS_REQUEST,
      data: id,
    });
  }; // 고차함수: 아래의 반복문에 대한 데이터를 넘겨주기 위함

  return (
    <ListStyle
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <DivStyle>
          <Button>더 보기</Button>
        </DivStyle>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <ListItem>
          <Card actions={[<StopOutlined key="stop" onClick={onCancle(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </ListItem>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;

const ListStyle = styled(List)`
  margin-bottom: 20px;
`;
const DivStyle = styled.div`
  text-align: center;
  margin: 10px 0;
`;
const ListItem = styled(List.Item)`
  margin-top: 20px;
`;
