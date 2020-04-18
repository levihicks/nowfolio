import React from 'react';
import { compose } from 'recompose';
import 'react-router-dom';
import styled from 'styled-components';


import { withTheme } from './components/Theme';

import SidebarNav from './components/SidebarNav';

const AppContainer = styled.div`
  background: ${props=>props.theme.white};
`;

const App = props => {
  return (
    <AppContainer className="container-fluid">
      <div className="row">
        <SidebarNav />
      </div>
    </AppContainer>
  );
}

export default compose(
  withTheme
)(App);
