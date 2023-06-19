import React, { useState } from 'react';
import styled from 'styled-components';
import { ProfileImage36 } from '../Common/ProfileImage';
import { writeCommentAPI } from '../../api/CommentAPI';
import { useParams } from 'react-router-dom';

const InputCommentStyle = styled.form`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 0.5px solid var(--color-maingrey);
  background: white;

  .inp-comment {
    width: calc(100% - 100px);
    font-size: 14px;
    padding: 6px;
    &::placeholder {
      color: var(--color-maingrey);
    }
  }
  .btn-comment {
    width: 35px;
    font-size: 14px;
    &:disabled {
      color: var(--color-maingrey);
    }
  }
`;

export default function InputComment({ image }) {
  const { id } = useParams();
  const [inputVal, setInputVal] = useState('');
  const test_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODkyNWZmYjJjYjIwNTY2MzMzY2Y4MyIsImV4cCI6MTY5MTg5NDU0MCwiaWF0IjoxNjg2NzEwNTQwfQ.CMVKaojlNSWLjmtbZ_AY6shkkStQgp1DHP3z87oIPe8';
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postCmt = await writeCommentAPI(test_token, id, inputVal);
    setInputVal('');
    console.log(postCmt);
  };
  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };
  return (
    <InputCommentStyle onSubmit={handleSubmit}>
      <ProfileImage36 />
      <label htmlFor='inpComment' className='a11y-hidden'>
        댓글을 입력해주세요
      </label>
      <input
        id='inpComment'
        className='inp-comment'
        type='text'
        placeholder='댓글 입력하기...'
        onChange={handleInputChange}
        value={inputVal}
      />
      {inputVal ? (
        <button className='btn-comment'>게시</button>
      ) : (
        <button className='btn-comment' disabled>
          게시
        </button>
      )}
    </InputCommentStyle>
  );
}
