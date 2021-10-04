import React from "react";
import PropTypes from "prop-types";
import { List, Button, Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const FollowList = ({ header, data }) => {
  // <List /> antd 공식문서에 사용법 나와 있음(참고하기)
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
          <Card actions={[<LoadingOutlined key="loading" />]}>
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
