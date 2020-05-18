import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  error: null,
  loading: false,
  userCoins: [],
};

const addUserCoinStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: false,
  });
};
const addUserCoinSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    userCoins: state.userCoins.concat(action.coin),
  });
};
const addUserCoinFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const removeUserCoinStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: false,
  });
};
const removeUserCoinSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    userCoins: state.userCoins.filter((c) => c.coinId !== action.coinId),
  });
};
const removeUserCoinFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const updateUserCoinStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: false,
  });
};
const updateUserCoinSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    userCoins: state.userCoins.map((c) => {
      if (c.coinId === action.coinId)
        return {
          ...c,
          quantity: action.newQuantity,
          price: action.newPrice,
        };
      else return c;
    }),
  });
};
const updateUserCoinFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const fetchUserCoinsStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: false,
  });
};
const fetchUserCoinsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    userCoins: action.userCoins,
  });
};
const fetchUserCoinsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_COIN_START:
      return addUserCoinStart(state, action);
    case actionTypes.ADD_USER_COIN_SUCCESS:
      return addUserCoinSuccess(state, action);
    case actionTypes.ADD_USER_COIN_FAIL:
      return addUserCoinFail(state, action);
    case actionTypes.REMOVE_USER_COIN_START:
      return removeUserCoinStart(state, action);
    case actionTypes.REMOVE_USER_COIN_SUCCESS:
      return removeUserCoinSuccess(state, action);
    case actionTypes.REMOVE_USER_COIN_FAIL:
      return updateUserCoinFail(state, action);
    case actionTypes.UPDATE_USER_COIN_START:
      return updateUserCoinStart(state, action);
    case actionTypes.UPDATE_USER_COIN_SUCCESS:
      return updateUserCoinSuccess(state, action);
    case actionTypes.UPDATE_USER_COIN_FAIL:
      return removeUserCoinFail(state, action);
    case actionTypes.FETCH_USER_COINS_START:
      return fetchUserCoinsStart(state, action);
    case actionTypes.FETCH_USER_COINS_SUCCESS:
      return fetchUserCoinsSuccess(state, action);
    case actionTypes.FETCH_USER_COINS_FAIL:
      return fetchUserCoinsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
