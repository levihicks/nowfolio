import React from "react";
import { compose } from "recompose";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";

import { withTheme } from "./components/Theme";

import SidebarNav from "./components/SidebarNav";
import * as ROUTES from "./constants/routes";
import Home from "./components/Home";
import Search from "./components/Search";
import Compare from "./components/Compare";
import Account from "./components/Account";
import CoinInfo from "./components/CoinInfo";
import Authenticate from "./components/Authenticate";
import { withCoinInfoContextProvider } from "./contexts/CoinInfoContext";
import { withCoinsContextProvider } from "./contexts/CoinsContext";
import { withAuthProvider } from "./session";

const AppContainer = styled.div`
  background: ${(props) => props.theme.white};
  @media (max-width: 767px) {
    margin-top: 80px;
  }
`;

const App = (props) => {
  return (
    <BrowserRouter>
      <AppContainer className="container-fluid">
        <div className="row" style={{ minHeight: "100vh" }}>
          <SidebarNav />
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.SEARCH} component={Search} />
          <Route path={ROUTES.COMPARE} component={Compare} />
          <Route path={ROUTES.ACCOUNT} component={Account} />

          <Route exact path={ROUTES.STOCK_INFO} component={CoinInfo} />
          <Route path={ROUTES.STOCK_INFO_DETAILS} component={CoinInfo} />

          <Route path={ROUTES.SIGN_IN} component={Authenticate} />
          <Route path={ROUTES.CREATE_ACCOUNT} component={Authenticate} />
        </div>
      </AppContainer>
    </BrowserRouter>
  );
};

export default compose(
  withTheme,
  withCoinsContextProvider,
  withCoinInfoContextProvider,
  withAuthProvider
)(App);
