import React from "react";

import Base from "../components/Base";
import { styled } from "styled-components";
import Card from "../components/Card";

function Home() {

  return (
    <Base>
      <MainHome>
        <Division>Welcome to Milky Man's Paal Pannai  </Division>

        <Cards>
          <Card />
        </Cards>
      </MainHome>
    </Base>
  );
}

export default Home;
const MainHome = styled.div`
  position: relative;
  width: 100% !important;
  background-image: linear-gradient(to bottom, #f4e2cc, #ffffff) !important;
`;
const Division = styled.div`
  position: relative;
  text-align: center;
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 1cm;
  padding-top: 2cm;

  @media only screen and (max-width: 768px) {
    position: relative;
    padding-top: 1cm;
    text-align: center;
    font-size: x-large;
    font-weight: bold;
  }
`;


const Cards = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

