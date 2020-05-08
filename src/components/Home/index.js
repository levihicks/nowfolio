import React from "react";
import styled from "styled-components";
import UserCoins from "./UserCoins";
import CoinInfo from "../CoinInfo";

const StyledHomeEl = styled.div`
  padding-top: 30px;
  height: 100vh;
`;

const Home = () => {
  return (
    <React.Fragment>
      <StyledHomeEl as={UserCoins} bootstrapProps="offset-1 col-10 col-lg-5" />
      <CoinInfo bootstrapProps="mx-auto col-10 col-lg-5 order-first order-lg-last" />
    </React.Fragment>
  );
};

export default Home;
