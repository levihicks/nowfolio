import React from 'react';
import styled from 'styled-components';
import UserCoins from './UserCoins';
import CoinInfo from '../CoinInfo';

const StyledHomeEl = styled.div
`
    padding-top: 30px;
    height: 100vh;
`;

const Home = () => {

    return (
        <React.Fragment>
            <StyledHomeEl as={UserCoins} bootstrapProps="offset-1 col-5" />
            <CoinInfo bootstrapProps="col-5"/>
        </React.Fragment>
    )
};

export default Home;