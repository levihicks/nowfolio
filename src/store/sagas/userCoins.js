import { put, } from 'redux-saga/effects';
import { userCoinsRef, userCoinRef } from '../../firebase';

import * as actions from '../actions';

export function* addUserCoinSaga(action) {
    yield put(actions.addUserCoinStart());
    try {
        yield userCoinsRef(action.uid)
            .push(action.coin)
        yield put(actions.addUserCoinSuccess(action.coin));
        yield put(actions.fetchUserCoins(action.uid));
    } catch (error) {
        yield put(actions.addUserCoinFail(error));
    }
}

export function* removeUserCoinSaga(action) {
    yield put(actions.removeUserCoinStart());
    try {
        yield userCoinRef(action.uid, action.coinId).remove();
        yield put(actions.removeUserCoinSuccess(action.coinId));
        yield put(actions.fetchUserCoins(action.uid));
    } catch (error) {
        yield put(actions.removeUserCoinFail(error));
    }
}

export function* updateUserCoinSaga(action) {
    yield put(actions.updateUserCoinStart());
    try {
        yield userCoinRef(action.uid, action.coinId)
            .update({
                quantity: action.newQuantity,
                price: action.newPrice
            });
        yield put(actions.updateUserCoinSuccess(action.coinId, action.newQuantity, action.newPrice));
        yield put(actions.fetchUserCoins(action.uid));
    } catch (error) {
        yield put(actions.updateUserCoinFail(error));
    }
}

export function* fetchUserCoinsSaga(action) {
    yield put(actions.fetchUserCoinsStart());
    try {
        let fetchedCoins = [];

        yield userCoinsRef(action.uid)
            .once('value', snapshot => {
                const userCoinsObj = snapshot.val();
                if(userCoinsObj){
                    fetchedCoins = Object.keys(userCoinsObj)
                        .map(coinId => (
                            {...userCoinsObj[coinId], coinId}
                        ))
                }
            })
        yield put(actions.fetchUserCoinsSuccess(fetchedCoins));
    } catch (error) {
        yield put(actions.fetchUserCoinsFail(error))
    }
}