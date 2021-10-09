import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
// css
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  // img role="presentation" // 클릭이 가능하지만 굳이 클릭할 필요는 없다
  if (images.length === 1) {
    return (
      <>
        <OneImage role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <TwoImage role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
        <TwoImage role="presentation" src={images[1].src} alt={images[1].src} onClick={onZoom} />
      </>
    );
  }
  // render
  return (
    <>
      <div>
        <ImgRender role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
        <Div role="presentation" onClick={onZoom}>
          <PlusOutlined />
          <br />
          {images.length - 1} 개의 사진 더보기
        </Div>
      </div>
    </>
  );
};

PostImages.PropTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;

const Div = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  vertical-align: middle;
`;
const OneImage = styled.img`
  max-height: 250px;
  max-width: 180px;
`;
const TwoImage = styled.img`
  width: 50%;
  display: inline-block;
`;
const ImgRender = styled.img`
  width: 50%;
`;
