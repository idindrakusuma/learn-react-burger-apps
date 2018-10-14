import axios from '../../common/api.orders';
import * as actionTypes from '../actions/actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  }
}

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURHCASE_BURGE_FAILED,
    error: error,
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    /* then, post the order to server */
    axios.post('/orders.json', orderData)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerFailed(err));
      })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
  }
}

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
}

export const fetchOrders = () => {
  return dispatch => {
    axios.get('/orders.json')
      .then(res => {
        const fetchData = [];
        for (let key in res.data) {
          fetchData.push({
            ...res.data[key],
            id: key,
          });
        }
        /* save to store via reducer */
        dispatch(fetchOrdersSuccess(fetchData))
      })
      .catch(err => {
        dispatch(fetchOrdersFailed(err));
      })
  }
}