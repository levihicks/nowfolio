import React, { useState, useContext, useEffect, useCallback } from "react";

import { CoinsContext } from "./CoinsContext";

export const CoinInfoContext = React.createContext(null);

export const withCoinInfoContextProvider = (Component) => (props) => {
  const [currentCoin, setCurrentCoin] = useState(null);
  const [id, setId] = useState(null);
  const allCoins = useContext(CoinsContext);

  const setNewCoin = useCallback(() => {
    setCurrentCoin(
      id && allCoins
        ? allCoins.filter((c) => id === c.tag + "-" + c.quoteCurrency)[0]
        : null
    );
  }, [allCoins, id]);

  useEffect(() => {
    setNewCoin();
  }, [setNewCoin]);

  return (
    <CoinInfoContext.Provider
      value={{ currentCoin: currentCoin, setNewCoin: setId }}
    >
      <Component {...props} />
    </CoinInfoContext.Provider>
  );
};
