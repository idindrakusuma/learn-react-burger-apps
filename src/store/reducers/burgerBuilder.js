import * as actionTypes from '../actions/actionTypes';

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 0,
        error: false,
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      }
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
      }
    default:
      return state;
  }
};

export default reducer;