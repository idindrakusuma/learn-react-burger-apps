import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 0
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

  }


  render () {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BurgerControls 
          ingredientsAdded={this.addIngredientHanlder}/>
      </Aux>
    );
  }
}

export default BurgerBulder;