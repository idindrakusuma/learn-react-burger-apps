import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.PURCHASE_INIT):
      return updateObject(state, { purchased: false });
    case (actionTypes.PURCHASE_BURGER_START):
      return updateObject(state, { loading: true });
    case (actionTypes.PURCHASE_BURGER_SUCCESS):
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      }
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      }
    case (actionTypes.PURHCASE_BURGE_FAILED):
      return updateObject(state, { loading: false });
    case (actionTypes.FETCH_ORDERS_START):
      return updateObject(state, { loading: true });
    case (actionTypes.FETCH_ORDERS_SUCCESS):
      return {
        ...state,
        orders: action.orders,
        loading: false,
      }
    case (actionTypes.FETCH_ORDERS_FAILED):
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    default:
      return state;
  }
}

export default reducer;