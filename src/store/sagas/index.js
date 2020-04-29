import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
    addUserCoinSaga,
    removeUserCoinSaga,
    updateUserCoinSaga,
    fetchUserCoinsSaga
} from './userCoins';


export function* watchUserCoins() {
    yield all([
        takeEvery(actionTypes.ADD_USER_COIN, addUserCoinSaga),
        takeEvery(actionTypes.REMOVE_USER_COIN, removeUserCoinSaga),
        takeEvery(actionTypes.UPDATE_USER_COIN, updateUserCoinSaga),
        takeEvery(actionTypes.FETCH_USER_COINS, fetchUserCoinsSaga)
    ]);
};