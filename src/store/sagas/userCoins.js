import { put, delay } from 'redux-saga/effects';

import * as actions from '../actions';

export function* addUserCoinSaga(action) {
    yield put(actions.addUserCoinStart());
    try {
        // side effect goes here
        yield put(actions.addUserCoinSuccess(action.coin));
    } catch (error) {
        yield put(actions.addUserCoinFail(error));
    }
}

export function* removeUserCoinSaga(action) {
    yield put(actions.removeUserCoinStart());
    try {
        // side effect goes here
        yield put(actions.removeUserCoinSuccess(action.coin));
    } catch (error) {
        yield put(actions.removeUserCoinFail(error));
    }
}

export function* fetchUserCoinsSaga(action) {
    yield put(actions.fetchUserCoinsStart());
    try {
        // side effect goes here
        yield delay(1000);
        const userCoins = [];
        yield put(actions.fetchUserCoinsSuccess(userCoins))
    } catch (error) {
        yield put(actions.fetchUserCoinsFail(error))
    }
}