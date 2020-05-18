import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../../store/actions";
import ViewOption from "./ViewOption";
import CoinList from "./CoinList";
import { AuthContext } from "../../../session";

const StyledUserCoins = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => (props.portfolioActive ? "0px" : "68px")};
`;

const ViewOptions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const Total = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-top: auto;
  margin-bottom: 20px;
`;

const UserCoins = (props) => {
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [portfolioActive, setPortfolioActive] = useState(true);

  const userCoins = useSelector((state) => state.userCoins.userCoins);

  const authContext = useContext(AuthContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchUserCoins(authContext && authContext.uid));
  }, [authContext, dispatch]);

  useEffect(() => {
    const newPortfolio = [];
    const newWatchlist = [];
    userCoins.forEach((c) => {
      (c.quantity ? newPortfolio : newWatchlist).push(c);
    });
    setPortfolio(newPortfolio);
    setWatchlist(newWatchlist);
  }, [userCoins]);

  const toggleActive = () => setPortfolioActive(!portfolioActive);

  let total = 0;
  if (portfolioActive) {
    total = portfolio.reduce((t, s) => t + Number(s.quantity * s.price), 0);
  }
  return (
    <StyledUserCoins
      className={[props.bootstrapProps, props.className].join(" ")}
      portfolioActive={portfolioActive}
    >
      <ViewOptions>
        <ViewOption
          portfolioView
          viewActive={portfolioActive}
          click={!portfolioActive && toggleActive}
        />
        <ViewOption
          viewActive={!portfolioActive}
          click={portfolioActive && toggleActive}
        />
      </ViewOptions>
      <CoinList coinList={portfolioActive ? portfolio : watchlist} />
      {portfolioActive && <Total>Total: {total.toFixed(2)}</Total>}
    </StyledUserCoins>
  );
};

export default UserCoins;
