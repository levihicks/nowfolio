import React from 'react';
import styled from 'styled-components';
import UserStocks from './UserStocks';

const StyledUserStocks = styled(UserStocks)
`
    padding-top: 30px;
    height: 100vh;
`;

const Home = () => {

    return (
        <React.Fragment>
            <StyledUserStocks bootstrapProps="offset-1 col-5" />
        </React.Fragment>
    )
};

export default Home;