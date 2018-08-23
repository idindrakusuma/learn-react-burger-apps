import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBulder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  }

  render () {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div> Burger Controls </div>
      </Aux>
    );
  }
}

export default BurgerBulder;