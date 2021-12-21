import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Input, Button } from 'antd';

const { TextArea } = Input;

// 첫 번째 게시글 #해시태그 #익스프레스
const PostCardContent = ({ postData, editMode, onChangePost, onCancelUpdate }) => {
  const dispatch = useDispatch();
  const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
  const [editText, setEditText] = useState(postData);

  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdate();
    }
  }, [updatePostDone]);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  return (
    <div>
      {editMode ? (
        <>
          <TextArea value={editText} onChange={onChangeText} />
          <Button.Group>
            <Button loading={updatePostLoading} onClick={onChangePost(editText)}>
              수정
            </Button>
            <Button type="danger" onClick={onCancelUpdate}>
              취소
            </Button>
          </Button.Group>
        </>
      ) : (
        postData.split(/(#[^\s#]+)/g).map((v, i) => {
          // 정규표현식: 태그를 찾고, 태그 이후 단어들 포함, 띄어쓰기 제외, /g (모든 단어)
          if (v.match(/(#[^\s#]+)/)) {
            // 정규식(태그달린 단어)과 매치가 된다면?
            return (
              // 태그 이후 단어들을 링크로 설정
              // eslint-disable-next-line react/no-array-index-key
              <Link href={`/hashtag/${v.slice(1)}`} key={i} prefetch={false}>
                <a>{v}</a>
              </Link>
            );
          }
          return v; // 태그된 단어 자체를 return
        })
      )}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired, // 받아온 data의 type이 string(문자열)이다
  editMode: PropTypes.bool,
  onCancelUpdate: PropTypes.func.isRequired,
  onChangePost: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;

// ? how to find hashTag whit split 해쉬태그를 어떻게 찾는지 구글링 검색
//! 정규표현식은 regexr 참고
