import React, { useState, useContext, useEffect } from "react";

import { CoinsContext } from "./CoinsContext";

export const CoinInfoContext = React.createContext(null);

export const withCoinInfoContextProvider = (Component) => (props) => {
  const [currentCoin, setCurrentCoin] = useState(null);
  const [id, setId] = useState(null);
  const allCoins = useContext(CoinsContext);

  useEffect(() => {
    if (
      id &&
      allCoins &&
      (!currentCoin ||
        currentCoin.tag !== id.split("-")[0] ||
        currentCoin.quoteCurrency !== id.split("-")[1])
    ) {
      setCurrentCoin(
        allCoins.filter((c) => id === c.tag + "-" + c.quoteCurrency)[0]
      );
    } else if (!id && currentCoin) {
      setCurrentCoin(null);
    }
  }, [allCoins, id, currentCoin]);

  return (
    <CoinInfoContext.Provider
      value={{
        currentCoin: currentCoin,
        setNewCoin: setId,
      }}
    >
      <Component {...props} />
    </CoinInfoContext.Provider>
  );
};
