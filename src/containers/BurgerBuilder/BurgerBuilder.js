import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';
/* api */
import axios from '../../common/api.orders';

const INGREDIENT_PRICE = {
  salad: 0.2,
  bacon: 0.4,
  cheese: 0.4,
  meat: 1.0
}

class BurgerBulder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0)

      this.setState({
        purchasable: sum > 0
      })

  }

  addIngredientHanlder = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })

    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })

    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false})
  }

  purchaseContinueHandler = () => {
    /* set loading */
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      cusromer: {
        name: 'Indra Kusuma',
        address: {
          street: 'Jalan Pusponjolo',
          city: 'Semarang',
          zipCode: 12334,
          country: 'Indonesia'
        },
        email: 'id.indrakusuma@gmail.com'
      },
      deliveryMethod: 'fastest'
    };
    /* post to backend */
    axios.post('/orders.json', order)
      .then(res => {
        console.log(res)
        this.setState({ loading: false, purchasing: false})
      })
      .catch(err => {
        console.log(err)
        this.setState({ loading: false, purchasing: false})
      })
  }

  render () {
    /* make information for disabled button */
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    /* set loading */
    let orderSummary = <OrderSummary 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice}
                        modalClosed={this.purchaseCancelHandler}
                        continue={this.purchaseContinueHandler}>
                      </OrderSummary>;
    if(this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
          { orderSummary }
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BurgerControls 
          ingredientsAdded={this.addIngredientHanlder} 
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          order={this.purchaseHandler} />
      </Aux>
    );
  }
}

export default withErrorHanlder(BurgerBulder, axios);