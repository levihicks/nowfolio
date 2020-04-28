import * as actionTypes from './actionTypes';

export const addUserCoinStart = (coin) => {
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

export const removeUserCoinStart = (coin) => {
    return { 
        type: actionTypes.REMOVE_USER_COIN_START
    }
}
export const removeUserCoinSuccess = (coin) => {
    return { 
        type: actionTypes.REMOVE_USER_COIN_SUCCESS,
        coin: coin
    }
}
export const removeUserCoinFail = (error) => {
    return { 
        type: actionTypes.REMOVE_USER_COIN_FAIL,
        error: error
    }
}
export const removeUserCoin = (coin, uid) => {
    return { 
        type: actionTypes.REMOVE_USER_COIN,
        coin: coin,
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