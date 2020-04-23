import React from 'react';
import styled from 'styled-components';
import UserStocks from './UserStocks';
import StockInfo from '../StockInfo';

const StyledHomeEl = styled.div
`
    padding-top: 30px;
    height: 100vh;
`;

const Home = () => {

    return (
        <React.Fragment>
            <StyledHomeEl as={UserStocks} bootstrapProps="offset-1 col-5" />
            <StockInfo bootstrapProps="col-5"/>
        </React.Fragment>
    )
};

export default Home;