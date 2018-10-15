import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../common/api.orders';
import * as Actions from '../../store/actions/index';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchStartOrders(this.props.token);
  }

  render () {
    return (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchStartOrders: (token) => dispatch(Actions.fetchOrders(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));