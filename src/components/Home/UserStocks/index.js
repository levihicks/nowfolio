import React, {useState} from 'react';
import ViewOption from './ViewOption';
import StockList from './StockList';
import styled from 'styled-components';

const StyledUserStocks = styled.div
`
    display: flex;
    flex-direction: column;
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

const portfolio = [{name:"Dow Jones", shares: "1", tag:"DOWJ", price: "116.33", delta: "-3.55%", id: 1},
                    {name:"Dow Jones", shares: "2", tag:"DOWJ", price: "116.33", delta: "-3.55%", id: 2}];

const watchList = [{name:"Dow Jones", tag:"DOWJ", price: "116.33", delta: "-3.55%", id: 1},
{name:"Dow Jones", tag:"DOWJ", price: "116.33", delta: "-3.55%", id: 2}];

const UserStocks = props => {
    const [portfolioActive, setPortfolioActive] = useState(true);
    const toggleActive = () => setPortfolioActive(!portfolioActive);

    const stockList = portfolioActive ? portfolio : watchList;    
    let total = 0;
    if (portfolioActive) {
        total = stockList.reduce((t, s) => t + Number(s.shares * s.price), 0);
    }
    return (
        <StyledUserStocks className={[props.bootstrapProps, props.className].join(" ")}>
            <ViewOptions>
                <ViewOption 
                    portfolioView 
                    viewActive={portfolioActive} 
                    click={!portfolioActive && toggleActive} />
                <ViewOption viewActive={!portfolioActive} 
                    click={portfolioActive && toggleActive} />
            </ViewOptions>
            <StockList stockList={stockList} />
            {
                portfolioActive && 
                <Total>
                    Total: {total}
                </Total>
            }
        </StyledUserStocks>
    );
}

export default UserStocks;