import React, { useState, useEffect } from 'react';
import { coinbaseAxios } from '../../axios';

export const CoinsContext = React.createContext(null);

const withCoinsContextProvider = Component => props => {

    const [coins, setCoins] = useState(null);
    useEffect(() => {
        coinbaseAxios.get('/currencies')
            .then(res => {
                const currencies = res.data;
                coinbaseAxios.get('/products')
                    .then(res => {
                        const products = res.data;
                        const coinbaseCoins = products.map( p => {
                            const pName = currencies.filter(c => c.id === p.base_currency)[0].name;
                            return { tag: p.base_currency, name: pName, quoteCurrency: p.quote_currency };
                        });
                        setCoins(coinbaseCoins);
                    })
                    .catch(err => console.log(err))
                }
            )
            .catch(err => console.log(err));
    }, []);

    return (
        <CoinsContext.Provider value={coins}>
            <Component {...props} />
        </CoinsContext.Provider>
    );
};

export default withCoinsContextProvider;