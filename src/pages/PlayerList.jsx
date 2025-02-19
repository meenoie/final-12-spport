import React, { useState, useEffect } from 'react';
import Header from '../components/Common/Header/Header';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Common/NavBar';
import styled from 'styled-components';
import SelectFilter from '../components/Common/Filter/SelectFilter';
import bsPlayerData from '../assets/data/baseball_players.json';
import scPlayerData from '../assets/data/soccer_players.json';
import vbPlayerData from '../assets/data/volleyball_players.json';
import tokenData from '../assets/data/sport_users.json';
import { Helmet } from 'react-helmet-async';

export default function PlayerList() {
  const [position, setPosition] = useState([]);
  const [selectPosition, setSelectPosition] = useState('선택');
  const { id } = useParams();

  const sportIdentifier = id.split('_')[1];

  useEffect(() => {
    let initialPositions = [];
    if (sportIdentifier === 'BS') {
      initialPositions = ['전체', '투수', '외야수', '내야수', '포수'];
    } else if (sportIdentifier === 'SC') {
      initialPositions = ['전체', 'GK', 'DF', 'MF', 'FW'];
    } else if (sportIdentifier === 'VB') {
      initialPositions = ['전체', 'OH', 'OP', 'MB', 'S', 'L'];
    }
    setPosition(initialPositions);
  }, [sportIdentifier]);

  const teamName = tokenData.map((item) => item.accountname);
  const sameName = tokenData.map((item) => item.username);
  const matchingTeam =
    sameName.find((_, index) => teamName[index] === id) || '';

  console.log(matchingTeam);

  let teamPlayers = [];
  if (sportIdentifier === 'BS') {
    teamPlayers = bsPlayerData;
    teamPlayers = teamPlayers.filter(
      (player) => player.team === matchingTeam.split(' ')[0],
    );
  } else if (sportIdentifier === 'SC') {
    teamPlayers = scPlayerData;
    teamPlayers = teamPlayers.filter((player) => {
      const teamName = matchingTeam.split(' ')[0];
      if (teamName === 'FC') {
        return player.team === matchingTeam.split(' ')[1];
      } else if (teamName === '수원') {
        if (matchingTeam.split(' ')[1] === 'FC') {
          return player.team === '수원FC';
        } else if (matchingTeam.split(' ')[1] === '삼성') {
          return player.team === '수원';
        }
      } else {
        return player.team === teamName;
      }
    });
  } else if (sportIdentifier === 'VB') {
    teamPlayers = vbPlayerData;
    teamPlayers = teamPlayers.filter(
      (player) => player.team === matchingTeam.split(' ')[1],
    );
  }
  console.log(matchingTeam.split(' ')[1]);

  const filteredPlayers =
    selectPosition === '전체'
      ? teamPlayers
      : teamPlayers.filter((player) => player.position === selectPosition);

  return (
    <>
      <Helmet>
        <title>{matchingTeam} 선수 보러가기 • Spport</title>
      </Helmet>
      <h1 className='a11y-hidden'>선수 리스트</h1>
      <Header text='선수 리스트' />
      <MainContainer>
        <SectionFilter>
          <h2>{matchingTeam}</h2>
          <SelectFilter
            type='포지션'
            items={position}
            selectItem={selectPosition}
            setSelectItem={setSelectPosition}
          />
        </SectionFilter>
        <SectionList>
          <ul>
            {filteredPlayers.map((player, index) => (
              <li key={index}>
                <div>
                  <button>{player.uniform_number}</button>
                </div>
                <span>{player.name}</span>
                <PositionButton>{player.position}</PositionButton>
              </li>
            ))}
            {!filteredPlayers.length &&
              selectPosition !== '전체' &&
              teamPlayers.map((player, index) => (
                <li key={index}>
                  <div>
                    <button>{player.uniform_number}</button>
                  </div>
                  <span>{player.name}</span>
                  <PositionButton>{player.position}</PositionButton>
                </li>
              ))}
          </ul>
        </SectionList>
      </MainContainer>
      <NavBar />
    </>
  );
}

const MainContainer = styled.main`
  padding: 60px 15px 0 15px;

  @media screen and (min-width: 768px) and (max-width: 1246px) {
    margin-left: 60px;
    padding-top: 15px;
  }

  @media screen and (min-width: 1247px) {
    margin-left: 200px;
    padding-top: 15px;
  }
`;

const SectionFilter = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-bottom: 18px;
  h2 {
    font-size: 16px;
    color: var(--color-navy);
    font-weight: bold;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: -3%;
    width: 100vw;
    height: 1px;
    background-color: var(--color-maingrey);
  }
`;

const SectionList = styled.section`
  padding-bottom: 68px;
  ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    div {
      border: 3px solid var(--color-navy);
      border-radius: 50%;
      padding: 10px;

      button {
        font-size: 18px;
        font-weight: bold;
        width: 32px;
        height: 32px;
      }
    }

    span {
      font-size: 18px;
      color: var(--color-navy);
    }
  }
`;

const PositionButton = styled.button`
  padding: 8px 0;
  background-color: var(--color-navy);
  color: var(--color-lime);
  width: 56px;
  border-radius: 50px;
  font-size: 12px;
`;
