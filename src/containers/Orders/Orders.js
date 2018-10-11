import React, { Component } from 'react';

import Order from '../../components/Order/Order';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../common/api.orders';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        console.log(res);
        const fetchData = [];
        for (let key in res.data) {
          fetchData.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchData });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      })
  }

  render () {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}/>
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);