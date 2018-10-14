import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

import * as actions from '../../store/actions/order';

class Checkout extends Component {

  componentWillMount() {
    this.props.onPurchaseInit();
  }

  clickedCancelHandler = () => {
    this.props.history.goBack();
  }

  clickedContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      const isPurchased = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          { isPurchased }
          <CheckoutSummary
            clickedCancel={this.clickedCancelHandler}
            clickedContinue={this.clickedContinueHandler}
            ingredients={this.props.ings}/>

          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}/>
        </div>
      );
    }
    return (
      <div>
        { summary }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);