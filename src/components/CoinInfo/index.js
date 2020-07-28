import React, { useContext, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useLocation, Link, useParams } from "react-router-dom";
import { compose } from "recompose";

import * as ROUTES from "../../constants/routes";
import { CoinInfoContext } from "../../contexts/CoinInfoContext";
import TimespanSelect from "./TimespanSelect";
import withErrorModal from "../../hoc/withErrorModal";
import Modal from "../UI/Modal";
import Spinner from "../UI/Spinner";
import { coinbaseAxios } from "../../axios";
import { AuthContext } from "../../session";
import * as actions from "../../store/actions";
import AddToPortfolioForm from "./AddToPortfolioForm";
import CoinChart from "./CoinChart";

import RemoveFromPortfolio from "../../assets/removeFromPortfolio.svg";
import RemoveFromWatchlist from "../../assets/removeFromWatchlist.svg";
import BackButtonIcon from "../../assets/back.svg";
import AddToPortfolio from "../../assets/addToPortfolio.svg";
import AddToWatchlist from "../../assets/addToWatchlist.svg";

const StyledCoinInfo = styled.div`
  padding-top: 30px;
  @media (min-width: 992px) {
    min-height: 100vh;
  }
`;

const CoinInfoTopRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  position: relative;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const CoinTag = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-right: 15px;
`;

const CoinPrice = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const CoinDelta = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${(props) =>
    props.delta > 0
      ? props.theme.green
      : props.delta < 0
      ? props.theme.red
      : props.theme.gray};
  margin-left: 5px;
`;

const CoinName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const CoinInfoButton = styled.img`
  height: 40px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) =>
    props.disabled ? props.theme.buttonHoverOpacity : "1"};
  &:hover {
    opacity: ${(props) => props.theme.buttonHoverOpacity};
  }
`;

const NotAuthenticatedPopover = styled.div`
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};
  position: absolute;
  top: 100%;
  left: 50%;
  border-radius: 20px;
  transform: translateX(-50%);
  border: 1px solid ${(props) => props.theme.lightGreen};
  display: none;
  padding: 15px;
  ${CoinInfoButton}:hover+&, &:hover {
    display: inline-block;
  }
  z-index: 1000;
`;

const ToAuthLink = styled(Link)`
  font-weight: bold;
  color: ${(props) => props.theme.green};
  padding: 0 0.25rem;
  &:hover {
    color: ${(props) => props.theme.lightGreen};
    text-decoration: none;
  }
  &:first-child {
    padding-left: 0;
  }
`;

const CoinInfoTable = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CoinInfoTableEl = styled.div`
  font-size: 0.8rem;
  margin-top: 15px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  @media (min-width: 768px) {
    width: 33.333%;
  }
`;

const BackButton = styled.img`
  margin-top: -20px;
  height: 25px;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover {
    opacity: ${(props) => props.theme.buttonHoverOpacity};
  }
`;

const CoinInfo = (props) => {
  const { setError } = props;

  const [coinInfo, setCoinInfo] = useState(null);
  const [addingToPortfolio, setAddingToPortfolio] = useState(false);
  const [inPortfolio, setInPortfolio] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTimespan, setCurrentTimespan] = useState("Past Day");

  const dispatch = useDispatch();

  const userCoins = useSelector((state) => state.userCoins.userCoins);

  const currentPath = useLocation().pathname;

  const authContext = useContext(AuthContext);
  const coinInfoContext = useContext(CoinInfoContext);

  const params = useParams();

  const bootstrapProps =
    props.bootstrapProps || "offset-xs-0 offset-md-3 col-xs-10 col-md-6 ";

  const fetchCoinInfo = useCallback(() => {
    if (coinInfoContext.currentCoin) {
      setLoading(true);
      coinbaseAxios
        .get(
          `/products/${
            coinInfoContext.currentCoin.tag +
            "-" +
            coinInfoContext.currentCoin.quoteCurrency
          }/stats`
        )
        .then((res) => {
          let newCoinInfo = { ...res.data };
          Object.keys(newCoinInfo).map(
            (k) => (newCoinInfo[k] = Number(newCoinInfo[k]).toString())
          );
          setCoinInfo({
            ...newCoinInfo,
            delta:
              res.data.open === res.data.last
                ? 0
                : (
                    ((res.data.last - res.data.open) / res.data.open) *
                    100
                  ).toFixed(2),
          });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }
  }, [coinInfoContext.currentCoin, setError]);

  useEffect(() => {
    setInPortfolio(false);
    setInWatchlist(false);
    if (coinInfoContext.currentCoin) {
      fetchCoinInfo();
      const coinInUserCoins = userCoins.filter(
        (c) =>
          c.tag === coinInfoContext.currentCoin.tag &&
          c.quoteCurrency === coinInfoContext.currentCoin.quoteCurrency
      )[0];
      if (coinInUserCoins) {
        if (coinInUserCoins.quantity) setInPortfolio(coinInUserCoins.coinId);
        else setInWatchlist(coinInUserCoins.coinId);
      }
    }
  }, [coinInfoContext.currentCoin, fetchCoinInfo, userCoins]);

  // useEffect(() => {
  //   return () => {
  //     setNewCoin(null);
  //   };
  // }, [setNewCoin]);

  useEffect(() => {
    if (!coinInfoContext.currentCoin && params.id)
      coinInfoContext.setNewCoin(params.id);
  });

  let content = <Spinner />;

  if (!coinInfoContext.currentCoin && !params.id && !loading) content = <></>;

  const uid = authContext && authContext.uid;

  const handleWatchlistAdd = () => {
    const newCoinToAdd = {
      ...coinInfoContext.currentCoin,
    };
    dispatch(actions.addUserCoin(newCoinToAdd, uid));
  };

  const handlePortfolioAdd = () => {
    setAddingToPortfolio(true);
  };

  const handleUserCoinRemove = () => {
    let coinToRemove = inPortfolio || inWatchlist;
    dispatch(actions.removeUserCoin(coinToRemove, uid));
  };

  if (coinInfo && coinInfoContext.currentCoin && !loading) {
    content = (
      <React.Fragment>
        {addingToPortfolio && (
          <Modal hide={() => setAddingToPortfolio(false)}>
            <AddToPortfolioForm
              currentCoin={coinInfoContext.currentCoin}
              submitted={() => setAddingToPortfolio(false)}
            />
          </Modal>
        )}
        {currentPath === `${ROUTES.STOCK_INFO}/${params.id}` && (
          <BackButton
            src={BackButtonIcon}
            onClick={() => props.history.push("/search")}
          />
        )}
        <CoinInfoTopRow>
          <CoinTag>{coinInfoContext.currentCoin.tag}</CoinTag>
          <CoinPrice>{`${coinInfo.last} ${coinInfoContext.currentCoin.quoteCurrency}`}</CoinPrice>
          <CoinDelta delta={coinInfo.delta}>{coinInfo.delta}%</CoinDelta>
          <TimespanSelect
            selectedTimespan={currentTimespan}
            setSelectedTimespan={setCurrentTimespan}
          />
        </CoinInfoTopRow>
        <CoinInfoTopRow>
          <CoinName>{coinInfoContext.currentCoin.name}</CoinName>
          <div style={{ marginLeft: "auto", display: "flex" }}>
            <div style={{ position: "relative" }}>
              <CoinInfoButton
                disabled={!authContext || inWatchlist}
                src={inPortfolio ? RemoveFromPortfolio : AddToPortfolio}
                onClick={
                  authContext && !inWatchlist
                    ? inPortfolio
                      ? handleUserCoinRemove
                      : handlePortfolioAdd
                    : null
                }
              />
              {!authContext && (
                <NotAuthenticatedPopover>
                  <ToAuthLink to={ROUTES.CREATE_ACCOUNT}>
                    Make an account
                  </ToAuthLink>
                  or
                  <ToAuthLink to={ROUTES.SIGN_IN}>sign in</ToAuthLink> to add
                  this coin to your portfolio!
                </NotAuthenticatedPopover>
              )}
            </div>
            <div style={{ position: "relative" }}>
              <CoinInfoButton
                disabled={!authContext || inPortfolio}
                src={inWatchlist ? RemoveFromWatchlist : AddToWatchlist}
                onClick={
                  authContext && !inPortfolio
                    ? inWatchlist
                      ? handleUserCoinRemove
                      : handleWatchlistAdd
                    : null
                }
              />
              {!authContext && (
                <NotAuthenticatedPopover>
                  <ToAuthLink to={ROUTES.CREATE_ACCOUNT}>
                    Make an account
                  </ToAuthLink>
                  or
                  <ToAuthLink to={ROUTES.SIGN_IN}>sign in </ToAuthLink> to add
                  this coin to your watchlist!
                </NotAuthenticatedPopover>
              )}
            </div>
          </div>
        </CoinInfoTopRow>
        <CoinChart
          currentCoin={
            coinInfoContext.currentCoin.tag +
            "-" +
            coinInfoContext.currentCoin.quoteCurrency
          }
          timespan={currentTimespan}
        />
        <CoinInfoTable>
          <CoinInfoTableEl>Open: {coinInfo.open}</CoinInfoTableEl>
          <CoinInfoTableEl>Last: {coinInfo.last}</CoinInfoTableEl>
          <CoinInfoTableEl>High: {coinInfo.high}</CoinInfoTableEl>
          <CoinInfoTableEl>Volume: {coinInfo.volume}</CoinInfoTableEl>
          <CoinInfoTableEl>Low: {coinInfo.low}</CoinInfoTableEl>
          <CoinInfoTableEl>
            Change:{" "}
            {Number((coinInfo.last - coinInfo.open).toFixed(8)).toString()}
          </CoinInfoTableEl>
        </CoinInfoTable>
      </React.Fragment>
    );
  }

  return <StyledCoinInfo className={bootstrapProps}>{content}</StyledCoinInfo>;
};

export default compose(withRouter, withErrorModal)(CoinInfo);
