import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import CoinListItem from './CoinListItem';
import {CoinInfoContext} from '../../../../contexts/CoinInfoContext';
import PlaceholderMsg from '../../../UI/PlaceholderMsg';
const CoinList = props => {
    const { coinList } = props;

    const coinInfoContext = useContext(CoinInfoContext);

    const [hasOptionsActive, setHasOptionsActive] = useState(null);

    const listContent = coinList.length > 0 ? 
    coinList.map((ts, index) => {
        return (
            <CoinListItem 
                {...ts}
                key={ts.id} 
                
                hasOptionsActive={hasOptionsActive}
                openOptions={ id => setHasOptionsActive(id) }  />
        )
    }) : 
    <PlaceholderMsg>  
            No coins, add some to see them here!
    </PlaceholderMsg>;

    

    const setFirstItemActive = () => {
        if (coinList.length > 0) {
            const {tag, quoteCurrency} = listContent[0].props;
            coinInfoContext.setNewCoin(tag+"-"+quoteCurrency);
        }
    }

    if(!coinInfoContext.currentCoin){
        
        setFirstItemActive();
    }

    useEffect(()=>{
        if(coinInfoContext.currentCoin){
            setFirstItemActive();
        }
    }, []);

    return (
        <div style={{width: "100%", flexGrow: "1", overflow: "auto"}}>
            {listContent}
        </div>
    );
}

export default CoinList;