import axios from '../../common/api.orders';
import * as actionTypes from '../actions/actionTypes';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ingredients: ingredients,
  }
}

export const setIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => {
        /* call function set ingredient */
        console.log(res.data);
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(setIngredientsFailed());
      })
  }
}