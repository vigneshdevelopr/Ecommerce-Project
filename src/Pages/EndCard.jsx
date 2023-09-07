import React from 'react';
import { styled } from 'styled-components';
import endcard from '../assets/endcard.jpg';

function EndCard() {
  return (
    <Image>
      <Img>
        <img className='image' src={endcard} alt='endcard' />
      </Img>
    </Image>
  );
}

export default EndCard;

const Img = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width:2cm;
  }
`;

const Image = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
