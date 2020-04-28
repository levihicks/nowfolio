import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
    addUserCoinSaga,
    removeUserCoinSaga,
    fetchUserCoinsSaga
} from './userCoins';


export function* watchUserCoins() {
    yield all([
        takeEvery(actionTypes.ADD_USER_COIN, addUserCoinSaga),
        takeEvery(actionTypes.REMOVE_USER_COIN, removeUserCoinSaga),
        takeEvery(actionTypes.FETCH_USER_COINS, fetchUserCoinsSaga)
    ]);
};