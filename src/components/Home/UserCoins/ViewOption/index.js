import React from 'react';
import styled from 'styled-components';

import WatchlistIcon from '../../../../assets/watchlist.svg';
import WatchlistActiveIcon from '../../../../assets/watchlistActive.svg';
import PortfolioIcon from '../../../../assets/portfolio.svg';
import PortfolioActiveIcon from '../../../../assets/portfolioActive.svg';

const StyledViewOption = styled.div
`
    display: flex;
    align-items: center;
    color: ${props => props.viewActive ? props.theme.green : props.theme.black};
    font-weight: ${props => props.viewActive ? "bold" : "default"};
    font-size: 1.25rem;
    cursor: ${props => props.viewActive ? "default" : "pointer"};
    margin-bottom: 20px;
`

const StyledIcon = styled.img
`
    height: 20px;
    margin-right: 5px;
`;

const ViewOption = props => {
    const { viewActive, portfolioView } = props;
    let icon = null;
    if(viewActive)
        icon = portfolioView ? PortfolioActiveIcon : WatchlistActiveIcon;
    else
        icon = portfolioView ? PortfolioIcon : WatchlistIcon;
    return (
        <StyledViewOption 
            viewActive={viewActive} 
            onClick={props.click ? props.click : () => {}}>
            <StyledIcon src={icon} />
            {portfolioView ? "Portfolio" : "WatchList"}
        </StyledViewOption >
    );
}

export default ViewOption;