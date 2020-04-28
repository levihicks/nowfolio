import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {withRouter, useLocation, Link, useParams} from 'react-router-dom';
import {compose} from 'recompose';
import * as ROUTES from '../../constants/routes';
import {CoinInfoContext} from '../../contexts/CoinInfoContext';
import TimespanSelect from './TimespanSelect';
import PlaceholderChart from '../../assets/placeholderChart.svg';
import BackButtonIcon from '../../assets/back.svg';
import AddToPortfolio from '../../assets/addToPortfolio.svg';
import AddToWatchlist from '../../assets/addToWatchlist.svg';
import withErrorModal from '../../hoc/withErrorModal';
import Modal from '../UI/Modal';
import Spinner from '../UI/Spinner';
import { coinbaseAxios } from '../../axios';
import {AuthContext} from '../../session';
import * as actions from '../../store/actions';
import AddToPortfolioForm from './AddToPortfolioForm';

import RemoveFromPortfolio from '../../assets/removeFromPortfolio.svg';
import RemoveFromWatchlist from '../../assets/removeFromWatchlist.svg';


const StyledCoinInfo = styled.div
`
    padding-top: 30px;
    height: 100vh;
`;

const CoinInfoTopRow = styled.div
`
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    position: relative;
`;

const CoinTag = styled.div
`
    font-size: 2rem;
    font-weight: bold;
    margin-right: 15px;
`;

const CoinPrice = styled.div
`
    font-size: 1rem;
    font-weight: bold;
`;

const CoinDelta = styled.div
`
    font-size: .8rem;
    font-weight: bold;
    color: ${props => props.delta > 0 ? props.theme.green : props.delta < 0 ? props.theme.red : props.theme.gray};
    margin-left: 5px;
`;

const CoinName = styled.div
`
    font-size: 1rem;
    font-weight: bold;
`;

const CoinInfoButton = styled.img
`
    height: 40px;
    cursor: ${props => props.authenticated ? "pointer" : "default"};
    opacity: ${props => props.authenticated ? "1" : props.theme.buttonHoverOpacity};
    &:hover {
        opacity: ${props => props.theme.buttonHoverOpacity};
    }
`;

const NotAuthenticatedPopover = styled.div
`
    background: ${props => props.theme.white};
    color: ${props => props.theme.black};
    position: absolute;
    top: 100%;
    left: 50%;
    border-radius: 20px;
    transform: translateX(-50%);
    border: 1px solid ${props => props.theme.lightGreen};
    display: none;
    padding: 15px;
    ${CoinInfoButton}:hover+&, &:hover {
        display: inline-block;
    }
`

const ToAuthLink = styled(Link)
`
    font-weight: bold;
    color: ${props => props.theme.green};
    text-decoration: none;
    &:hover{
        color: ${props => props.theme.lightGreen};
        text-decoration: none;
    }
`

const CoinInfoTable = styled.div
`
    display: flex;
    flex-wrap: wrap;
`;

const CoinInfoTableEl = styled.div
`
    font-size: .8rem;
    margin-top: 15px;
    font-weight: bold;
    text-align: center;
    min-width: 33.333%
`;

const BackButton = styled.img
`
    margin-top: -20px;
    height: 25px;
    margin-bottom: 15px;
    cursor: pointer;
    &:hover {
        opacity: ${props => props.theme.buttonHoverOpacity};
    }
`;

const CoinInfo = props => {

    const dispatch = useDispatch();
    const userCoins = useSelector( state => state.userCoins.userCoins );

    const currentPath = useLocation().pathname;

    const authContext = useContext(AuthContext);

    const coinInfoContext = useContext(CoinInfoContext);
    let { setNewCoin } = coinInfoContext;

    const bootstrapProps = props.bootstrapProps || "offset-3 col-6";

    const { setError } = props;

    const [coinInfo, setCoinInfo] = useState(null);
    const [addingToPortfolio, setAddingToPortfolio] = useState(false);
    const [inPortfolio, setInPortfolio] = useState(false);
    const [inWatchlist, setInWatchlist] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();

    const fetchCoinInfo = useCallback(() => {
        if (coinInfoContext.currentCoin) {
            setLoading(true);
            coinbaseAxios.get(`/products/${coinInfoContext.currentCoin.tag
                +"-"+coinInfoContext.currentCoin.quoteCurrency}/stats`)
                .then(res => {
                    let newCoinInfo = {...res.data};
                    Object.keys(newCoinInfo).map( k =>  
                        newCoinInfo[k] = Number(newCoinInfo[k]).toString()
                    );
                    setCoinInfo({
                        ...newCoinInfo,
                        delta: res.data.open===res.data.last ? 
                        0 : 
                        ((res.data.last - res.data.open) / res.data.open * 100).toFixed(2)
                    });
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false); 
                    setError(err);
                });

        }
    }, [coinInfoContext.currentCoin, setError]);

    useEffect(() => {
        setInPortfolio(false);
        setInWatchlist(false);
        if(coinInfoContext.currentCoin){
            fetchCoinInfo();
            const coinInUserCoins = userCoins.filter(c => 
                c.tag === coinInfoContext.currentCoin.tag &&
                c.quoteCurrency === coinInfoContext.currentCoin.quoteCurrency
            )[0];
            if(coinInUserCoins) {
                if(coinInUserCoins.quantity)
                    setInPortfolio(true);
                else
                    setInWatchlist(true);
            }
        }
    }, [coinInfoContext.currentCoin, fetchCoinInfo, userCoins]);

    useEffect(() => {
        return () => {setNewCoin(null);};
    }, [setNewCoin])

    useEffect(() => {
        if(!coinInfoContext.currentCoin && params.id)
            coinInfoContext.setNewCoin(params.id);
    })
    

    let content = <Spinner />;

    if (!coinInfoContext.currentCoin && !params.id && !loading)
        content = <React.Fragment></React.Fragment>;

    const uid = authContext && authContext.uid;
    const handleWatchlistAdd = () => {
        const newCoinToAdd = {
            ...coinInfoContext.currentCoin
        }
        dispatch(actions.addUserCoin(newCoinToAdd, uid));
    }
    const handlePortfolioAdd = () => {
        setAddingToPortfolio(true);
    }
    const handleUserCoinRemove = () => {
        const coinToRemove = {
            ...coinInfoContext.currentCoin
        };
        dispatch(actions.removeUserCoin(coinToRemove, uid));
    }
    
    if (coinInfo && coinInfoContext.currentCoin && !loading) {
     content = (
        <React.Fragment>
            {
                addingToPortfolio && 
                <Modal hide={()=>setAddingToPortfolio(false)}>
                    <AddToPortfolioForm 
                        currentCoin={coinInfoContext.currentCoin} 
                        submitted={()=>setAddingToPortfolio(false)}/>
                </Modal>
            }
            {
                (currentPath === `${ROUTES.STOCK_INFO}/${params.id}`)
                && 
                <BackButton 
                    src={BackButtonIcon}
                    onClick={()=>props.history.push("/search")}/>
            }
            <CoinInfoTopRow>
                <CoinTag>{coinInfoContext.currentCoin.tag}</CoinTag>
                <CoinPrice>{`${coinInfo.last} ${coinInfoContext.currentCoin.quoteCurrency}`}</CoinPrice>
                <CoinDelta delta={coinInfo.delta}>{coinInfo.delta}%</CoinDelta>
                <TimespanSelect />
            </CoinInfoTopRow>
            <CoinInfoTopRow>
                <CoinName>
                    {coinInfoContext.currentCoin.name}
                </CoinName>
                <div style={{marginLeft: "auto", display: "flex"}}>
                    <div style={{position: "relative"}}>
                    <CoinInfoButton 
                        authenticated={authContext} 
                        src={inPortfolio ? RemoveFromPortfolio : AddToPortfolio} 
                        onClick={inPortfolio ? handleUserCoinRemove : handlePortfolioAdd}/>
                    { 
                        !authContext && 
                        <NotAuthenticatedPopover>
                            <ToAuthLink to={ROUTES.CREATE_ACCOUNT}>
                                Make an account 
                            </ToAuthLink> or
                            <ToAuthLink to={ROUTES.SIGN_IN}>
                                sign in 
                            </ToAuthLink>to add this coin to your portfolio!
                        </NotAuthenticatedPopover>
                    }
                    </div>
                    <div style={{position: "relative"}}>
                    <CoinInfoButton 
                        authenticated={authContext} 
                        src={inWatchlist ? RemoveFromWatchlist : AddToWatchlist} 
                        onClick={inWatchlist ? handleUserCoinRemove : handleWatchlistAdd}/>
                    { 
                        !authContext && 
                        <NotAuthenticatedPopover>
                            <ToAuthLink to={ROUTES.CREATE_ACCOUNT}>
                                Make an account 
                            </ToAuthLink> or  
                            <ToAuthLink to={ROUTES.SIGN_IN}>
                                sign in 
                            </ToAuthLink>to add this coin to your watchlist!
                        </NotAuthenticatedPopover>
                    }
                    </div>
                </div>
            </CoinInfoTopRow>
            <img style={{maxWidth: "100%", margin: "10px 0"}}src={PlaceholderChart} alt="" />
            <CoinInfoTable>
                <CoinInfoTableEl>Open: {coinInfo.open}</CoinInfoTableEl>
                <CoinInfoTableEl>Last: {coinInfo.last}</CoinInfoTableEl>
                <CoinInfoTableEl>High: {coinInfo.high}</CoinInfoTableEl>
                <CoinInfoTableEl>Volume: {coinInfo.volume}</CoinInfoTableEl>
                <CoinInfoTableEl>Low: {coinInfo.low}</CoinInfoTableEl>
                <CoinInfoTableEl>Change: {Number((coinInfo.last-coinInfo.open).toFixed(8)).toString()}</CoinInfoTableEl>
            </CoinInfoTable>
        </React.Fragment>
    )
    }
    

    return (
        <StyledCoinInfo className={bootstrapProps}>
            {content}
        </StyledCoinInfo>
    );
}

export default compose(
    withRouter,
    withErrorModal
)(CoinInfo);