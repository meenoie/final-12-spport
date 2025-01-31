import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBar from '../components/Common/NavBar';
import Header from '../components/Common/Header/Header';
import PostList from '../components/Post/PostList';
import Empty from '../components/Common/Empty';
import PostLoader from '../components/Skeleton/PostLoader';
import { useFeedQuery } from '../hooks/usePost';
import { setTeamToken } from '../util/setGameToken';

const FullSection = styled.main`
  padding: 50px 0 0;
  height: 100%;
  background: white;

  @media screen and (min-width: 768px) and (max-width: 1246px) {
    margin-left: 60px;
  }

  @media screen and (min-width: 1247px) {
    margin-left: 200px;
  }
`;

const SkipNavStyle = styled.div`
  a {
    z-index: 99999;
    position: absolute;
    top: -50px;
    left: 0;
    background: #000;
    height: 50px;
    line-height: 50px;
    color: #fff;
    font-size: 20px;
    padding: 0 15px;
    font-weight: bolder;
  }
  a:focus,
  a:active {
    top: 0;
  }
`;

export default function Home() {
  const [filterClick, setFilterClick] = useState(false);
  const { feed, isFeedLoading, isFeedError } = useFeedQuery();

  useEffect(() => {
    setTeamToken();
  }, []);

  return (
    <>
      <SkipNavStyle>
        <a href='#feed'>게시글 바로가기</a>
        <a href='#nav-홈'>네비게이션바 바로가기</a>
      </SkipNavStyle>
      <Header main setFilterClick={setFilterClick} />
      <FullSection>
        <h1 className='a11y-hidden'>피드</h1>
        {isFeedError && (
          <Empty
            message='피드 정보를 가져오는데 실패했습니다.'
            btnText='새로고침'
            link='/home'
          />
        )}
        {!isFeedLoading && feed.posts.length === 0 && (
          <Empty
            message='유저 또는 팀을 검색해 팔로우 해보세요!'
            btnText='검색하기'
            link='/search'
          />
        )}
        {isFeedLoading ? (
          <PostLoader />
        ) : (
          <PostList post={feed.posts} onlyGame={filterClick} isHome />
        )}
      </FullSection>
      <NavBar page='홈' />
    </>
  );
}
