import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
};

const INGREDIENT_PRICE = {
  salad: 0.2,
  bacon: 0.4,
  cheese: 0.4,
  meat: 1.0
}

const initIngredients = (state, action) => {
  return {
    ...state,
    ingredients: action.ingredients,
    totalPrice: 0,
    error: false,
  }
}

const addIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
  }
}

const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_INGREDIENTS: return initIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true });
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    default: return state;
  }
};

export default reducer;