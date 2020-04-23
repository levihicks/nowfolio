import React, {useContext} from 'react';
import styled from 'styled-components';
import OptionsIcon from '../../../../../assets/listItemOptions.svg';
import {StockInfoContext} from '../../../../../contexts/StockInfoContext';

const StyledStockListItem = styled.div
`
    border-top: 1px solid ${props => props.theme.gray};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &:last-child {
        border-bottom: 1px solid ${props => props.theme.gray};
    }
`;

const StockListItemEl = styled.div
`
    padding: 10px;
    font-size: 1rem;
    font-weight: bold;
    color: ${props => props.active ? props.theme.green : props.theme.gray};
`;

const Popover = styled.div
`
    position: absolute;
    z-index: 2;
    left: 100%;
    border: 1px solid ${props => props.theme.gray};
    padding: 5px;
    background: ${props => props.theme.white};
    button {
        color: ${props => props.theme.black};
        outline: none;
        background: none;
        border: none;
        width: 100%;
        text-align: left;
        padding: 3px 0;
        &:first-child {
            border-bottom: 1px solid ${props => props.theme.gray};
        }
        &:hover {
            color: ${props => props.theme.lightGreen};
        }
    }

    
`;

const StockListItem = ({name, shares, tag, price, delta, id, hasOptionsActive, openOptions }) => {

    const stockInfoContext = useContext(StockInfoContext);

    const setStockInfo = () => stockInfoContext.setTag(tag);

    const toggleOptions = () => {
        if(hasOptionsActive === id)
            openOptions(null)
        else
            openOptions(id);
    };

    return (
        <StyledStockListItem>
            <StockListItemEl 
                active={stockInfoContext.tag === tag}
                style={{marginRight: "auto", 
                    cursor: "pointer"}}
                onClick={setStockInfo}>
                {tag} {shares && `(${shares})`}
            </StockListItemEl>
            <StockListItemEl>
                {price}
            </StockListItemEl>
            <StockListItemEl 
                style={{fontSize: ".75rem", 
                    color: delta[0] === "-" ? "#A82C33" : "#2BA84A"}}>
                {delta}
            </StockListItemEl>
            <StockListItemEl>
                <img height="30" 
                    alt="" 
                    src={OptionsIcon} 
                    style={{cursor: "pointer"}} 
                    onClick={toggleOptions}/>
            </StockListItemEl>
            {hasOptionsActive === id &&
            <Popover>
                <button>Edit</button>
                <button>Remove</button>
            </Popover>
            }
        </StyledStockListItem>
    );
}

export default StockListItem;