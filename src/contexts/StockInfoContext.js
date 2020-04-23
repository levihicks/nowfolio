import React, { useState } from 'react';

export const StockInfoContext = React.createContext(null);

export const withStockInfoContextProvider = Component => props => {
    const [tag, setTag] = useState(null);

    return (
        <StockInfoContext.Provider value={{tag: tag, setTag: setTag}}>
            <Component {...props} />
        </StockInfoContext.Provider>
    )
};

