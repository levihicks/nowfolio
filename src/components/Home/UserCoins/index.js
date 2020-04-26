import React, {useState} from 'react';
import ViewOption from './ViewOption';
import CoinList from './CoinList';
import styled from 'styled-components';

const StyledUserCoins = styled.div
`
    display: flex;
    flex-direction: column;
    padding-bottom: ${props => props.portfolioActive ? "0px" : "68px"}
`;

const ViewOptions = styled.div
`
    display: flex;
    width: 100%;
    justify-content: space-around;
`;

const Total = styled.div
`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-top: auto;
    margin-bottom: 20px;
`;

const portfolio = [/*{name: "Bitcoin", id:"BTC-USD", tag: "BTC", quoteCurrency: "USD", delta: "-2.33", shares: "2.3", price:"33"},
{name: "Ethereum", id:"ETH-BTC", tag: "ETH", quoteCurrency: "BTC", delta: "-2.33", shares: "2.3", price:"33"},*/];

const watchList = [];

const UserCoins = props => {
    const [portfolioActive, setPortfolioActive] = useState(true);
    const toggleActive = () => setPortfolioActive(!portfolioActive);

    const coinList = portfolioActive ? portfolio : watchList;    
    let total = 0;
    if (portfolioActive) {
        total = coinList.reduce((t, s) => t + Number(s.shares * s.price), 0);
    }
    return (
        <StyledUserCoins 
            className={[props.bootstrapProps, props.className].join(" ")}
            portfolioActive={portfolioActive}>
            <ViewOptions>
                <ViewOption 
                    portfolioView 
                    viewActive={portfolioActive} 
                    click={!portfolioActive && toggleActive} />
                <ViewOption viewActive={!portfolioActive} 
                    click={portfolioActive && toggleActive} />
            </ViewOptions>
            <CoinList coinList={coinList} />
            {
                portfolioActive && 
                <Total>
                    Total: {total.toFixed(2)}
                </Total>
            }
        </StyledUserCoins>
    );
}

export default UserCoins;