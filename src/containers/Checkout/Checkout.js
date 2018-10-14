import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

  clickedCancelHandler = () => {
    this.props.history.goBack();
  }

  clickedContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      summary = (
        <div>
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
  }
}

export default connect(mapStateToProps)(Checkout);