import * as actionTypes from './actionTypes';

export const addUserCoinStart = () => {
    return { 
        type: actionTypes.ADD_USER_COIN_START
    }
}
export const addUserCoinSuccess = (coin) => {
    return { 
        type: actionTypes.ADD_USER_COIN_SUCCESS,
        coin: coin
    }
}
export const addUserCoinFail = (error) => {
    return { 
        type: actionTypes.ADD_USER_COIN_FAIL,
        error: error
    }
}
export const addUserCoin = (coin, uid) => {
    return { 
        type: actionTypes.ADD_USER_COIN,
        coin: coin,
        uid: uid
    }
}

export const removeUserCoinStart = () => {
    return { 
        type: actionTypes.REMOVE_USER_COIN_START
    }
}
export const removeUserCoinSuccess = (coinId) => {
    return { 
        type: actionTypes.REMOVE_USER_COIN_SUCCESS,
        coinId: coinId
    }
}
export const removeUserCoinFail = (error) => {
    return { 
        type: actionTypes.REMOVE_USER_COIN_FAIL,
        error: error
    }
}
export const removeUserCoin = (coinId, uid) => {
    return { 
        type: actionTypes.REMOVE_USER_COIN,
        coinId: coinId,
        uid: uid
    }
}


export const updateUserCoinStart = () => {
    return { 
        type: actionTypes.UPDATE_USER_COIN_START
    }
}
export const updateUserCoinSuccess = (coinId, newQuantity, newPrice) => {
    return { 
        type: actionTypes.UPDATE_USER_COIN_SUCCESS,
        coinId: coinId,
        newQuantity: newQuantity, 
        newPrice: newPrice
    }
}
export const updateUserCoinFail = (error) => {
    return { 
        type: actionTypes.UPDATE_USER_COIN_FAIL,
        error: error
    }
}
export const updateUserCoin = (coinId, newQuantity, newPrice, uid) => {
    return { 
        type: actionTypes.UPDATE_USER_COIN,
        coinId: coinId,
        newQuantity: newQuantity, 
        newPrice: newPrice,
        uid: uid
    }
}

export const fetchUserCoinsStart = (coin) => {
    return { 
        type: actionTypes.ADD_USER_COIN_START
    }
}
export const fetchUserCoinsSuccess = (userCoins) => {
    return { 
        type: actionTypes.FETCH_USER_COINS_SUCCESS,
        userCoins: userCoins
    }
}
export const fetchUserCoinsFail = (error) => {
    return { 
        type: actionTypes.FETCH_USER_COINS_FAIL,
        error: error
    }
}
export const fetchUserCoins = (uid) => {
    return { 
        type: actionTypes.FETCH_USER_COINS,
        uid: uid
    }
}