import React, { useState, useContext, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import CoinListItem from "./CoinListItem";
import { CoinInfoContext } from "../../../../contexts/CoinInfoContext";
import PlaceholderMsg from "../../../UI/PlaceholderMsg";
import Spinner from "../../../UI/Spinner";

const CoinList = (props) => {
  const { coinList } = props;

  const coinInfoContext = useContext(CoinInfoContext);

  const loading = useSelector((state) => state.userCoins.loading);

  const [hasOptionsActive, setHasOptionsActive] = useState(null);

  const listContent =
    coinList.length > 0 ? (
      coinList.map((ts, index) => {
        return (
          <CoinListItem
            {...ts}
            key={`${ts.tag}-${ts.quoteCurrency}`}
            hasOptionsActive={hasOptionsActive}
            openOptions={(id) => setHasOptionsActive(id)}
          />
        );
      })
    ) : (
      <PlaceholderMsg>No coins, add some to see them here!</PlaceholderMsg>
    );

  const setFirstItemActive = useCallback(() => {
    if (coinList.length > 0) {
      const { tag, quoteCurrency } = listContent[0].props;
      coinInfoContext.setNewCoin(tag + "-" + quoteCurrency);
    }
  }, [coinInfoContext, coinList.length, listContent]);

  useEffect(() => {
    if (
      !coinInfoContext.currentCoin ||
      coinList.filter((c) => c.coinId === hasOptionsActive).length === 0
    )
      setFirstItemActive();
    if (coinList.length === 0) coinInfoContext.setNewCoin(null);
  }, [coinInfoContext, coinList, setFirstItemActive, hasOptionsActive]);

  return (
    <div style={{ width: "100%", flexGrow: "1", overflow: "auto" }}>
      {loading ? <Spinner /> : listContent}
    </div>
  );
};

export default CoinList;
