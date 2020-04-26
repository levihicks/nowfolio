import React from 'react';
import { compose } from 'recompose';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';


import { withTheme } from './components/Theme';

import SidebarNav from './components/SidebarNav';
import * as ROUTES from './constants/routes';
import Home from './components/Home';
import Search from './components/Search';
import Compare from './components/Compare';
import Account from './components/Account';
import CoinInfo from './components/CoinInfo'
import Authenticate from './components/Authenticate';
import { withCoinInfoContextProvider } from './contexts/CoinInfoContext';
import { withCoinsContextProvider } from './contexts/CoinsContext';

const AppContainer = styled.div`
  background: ${props=>props.theme.white};
`;

const App = props => {

  return (
    <BrowserRouter>
      <AppContainer className="container-fluid">
        <div className="row" style={{minHeight: "100vh"}}>
          <SidebarNav />
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.SEARCH} component={Search} />
          <Route path={ROUTES.COMPARE} component={Compare} />
          <Route path={ROUTES.ACCOUNT} component={Account} />
          <Route path={ROUTES.STOCK_INFO} component={CoinInfo} />
          <Route path={ROUTES.AUTHENTICATE} component={Authenticate} />
        </div>        
      </AppContainer>
      </BrowserRouter>
    
  );
}

export default compose(
  withTheme,
  withCoinsContextProvider,
  withCoinInfoContextProvider,
)(App);
