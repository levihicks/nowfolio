import React, { useContext } from 'react';
import styled from 'styled-components';
import {withRouter, useLocation} from 'react-router-dom';
import {compose} from 'recompose';
import * as ROUTES from '../../constants/routes';
import {StockInfoContext} from '../../contexts/StockInfoContext';
import TimespanSelect from './TimespanSelect';
import PlaceholderChart from '../../assets/placeholderChart.svg';
import BackButtonIcon from '../../assets/back.svg'

const StyledStockInfo = styled.div
`
    padding-top: 30px;
    height: 100vh;
`;

const StockInfoTopRow = styled.div
`
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    position: relative;
`;

const StockTag = styled.div
`
    font-size: 2rem;
    font-weight: bold;
    margin-right: 15px;
`;

const StockPrice = styled.div
`
    font-size: 1rem;
    font-weight: bold;
`;

const StockDelta = styled.div
`
    font-size: .8rem;
    font-weight: bold;
    color: ${props => props.delta[0]==="-" ? props.theme.red : props.theme.green};
    margin-left: 5px;
`;

const StockName = styled.div
`
    font-size: 1rem;
    font-weight: bold;
`;

const StockInfoTable = styled.div
`
    display: flex;
    flex-wrap: wrap;
`;

const StockInfoTableEl = styled.div
`
    font-size: .8rem;
    margin-top: 15px;
    font-weight: bold;
    text-align: center;
    min-width: 33.333%
`;

const BackButton = styled.img
`
    margin-top: -20px;
    height: 25px;
    margin-bottom: 15px;
    cursor: pointer;
    &:hover {
        opacity: ${props => props.theme.buttonHoverOpacity};
    }
`

const StockInfo = props => {

    const currentPath = useLocation().pathname;
    console.log(currentPath);

    const stockInfoContext = useContext(StockInfoContext);

    const bootstrapProps = props.bootstrapProps || "offset-3 col-6";


    return (
        <StyledStockInfo className={bootstrapProps}>
            {
                currentPath === ROUTES.STOCK_INFO && 
                <BackButton 
                    src={BackButtonIcon}
                    onClick={()=>props.history.push("/search")}/>
            }
            <StockInfoTopRow>
                <StockTag>{stockInfoContext.tag}</StockTag>
                <StockPrice>$11.24</StockPrice>
                <StockDelta delta="-2.33%">-2.33%</StockDelta>
                <TimespanSelect />
            </StockInfoTopRow>
            <StockInfoTopRow>
                <StockName>
                    Dow Jones Industrial Average
                </StockName>
            </StockInfoTopRow>
            <img style={{maxWidth: "100%", margin: "10px 0"}}src={PlaceholderChart} alt="" />
            <StockInfoTable>
                <StockInfoTableEl>Open: $10.99</StockInfoTableEl>
                <StockInfoTableEl>Close: $10.99</StockInfoTableEl>
                <StockInfoTableEl>High: $10.99</StockInfoTableEl>
                <StockInfoTableEl>Volume: $10.99</StockInfoTableEl>
                <StockInfoTableEl>Low: $10.99</StockInfoTableEl>
                <StockInfoTableEl>Change: +$1.99</StockInfoTableEl>
            </StockInfoTable>
        </StyledStockInfo>
    );
}

export default compose(
    withRouter
)(StockInfo);