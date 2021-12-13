import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// 첫 번째 게시글 #해시태그 #익스프레스
const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => {
      // 정규표현식: 태그를 찾고, 태그 이후 단어들 포함, 띄어쓰기 제외, /g (모든 단어)
      if (v.match(/(#[^\s#]+)/)) {
        // 정규식(태그달린 단어)과 매치가 된다면?
        return (
          // 태그 이후 단어들을 링크로 설정
          // eslint-disable-next-line react/no-array-index-key
          <Link href={`/hashtag/${v.slice(1)}`} key={i}>
            <a>{v}</a>
          </Link>
        );
      }
      return v; // 태그된 단어 자체를 return
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired, // 받아온 data의 type이 string(문자열)이다
};

export default PostCardContent;

// ? how to find hashTag whit split 해쉬태그를 어떻게 찾는지 구글링 검색
//! 정규표현식은 regexr 참고
