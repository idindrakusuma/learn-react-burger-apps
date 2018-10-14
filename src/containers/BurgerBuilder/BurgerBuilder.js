import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../common/api.orders';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBulder extends Component {

  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  /* lifecycle react */
  componentDidMount () {
    this.props.initIngredients();
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0)

      return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.history.push({ pathname: '/checkout' });
  }

  render () {
    /* make information for disabled button */
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    /* set loading */
    let orderSummary = null;

    let burgerIngredients = this.props.error ? <p style={{textAlign: 'center'}}> { this.props.error.message } </p> : <Spinner />
    
    if (this.props.ings) {
      orderSummary = <OrderSummary 
                        ingredients={this.props.ings} 
                        price={this.props.totalPrice}
                        modalClosed={this.purchaseCancelHandler}
                        continue={this.purchaseContinueHandler}>
                      </OrderSummary>;

      burgerIngredients = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BurgerControls 
              ingredientsAdded={this.props.onIngredientAdded} 
              ingredientsRemoved={this.props.onIngredientRemove}
              disabled={disabledInfo}
              price={this.props.totalPrice}
              purchasable={this.updatePurchaseState(this.props.ings)}
              order={this.purchaseHandler} />
        </Aux>);
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
          { orderSummary }
        </Modal>
        { burgerIngredients }
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    onIngredientAdded: (ignName) => dispatch(burgerBuilderActions.addIngredient(ignName)),
    onIngredientRemove: (ignName) => dispatch(burgerBuilderActions.removeIngredient(ignName)),
    initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  }
}

export default connect(mapStateToProps, mapDispacthToProps) (withErrorHanlder(BurgerBulder, axios));