import React, { useState, useContext, useEffect } from 'react';

import {CoinsContext} from './CoinsContext';

export const CoinInfoContext = React.createContext(null);

export const withCoinInfoContextProvider = Component => props => {

    const allCoins = useContext(CoinsContext);

    const [currentCoin, setCurrentCoin] = useState(null);

    const [id, setId] = useState(null);

    const setNewCoin = () => {
        console.log("id: ",id);
        console.log("allCoins: ",allCoins);
       
        setCurrentCoin( id && allCoins ? allCoins.filter(c => id=== c.tag+"-"+c.quoteCurrency)[0] : null );
        //onsole.log(allCoins.filter(c => id=== c.tag+"-"+c.quoteCurrency)[0])
        
    }

    useEffect(() => {setNewCoin();}, [allCoins, id]);    

    return (
        <CoinInfoContext.Provider value={{currentCoin: currentCoin, setNewCoin: setId}}>
            <Component {...props} />
        </CoinInfoContext.Provider>
    )
};

