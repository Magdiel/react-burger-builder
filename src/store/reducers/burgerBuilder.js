import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5, 
    cheese: 0.4, 
    meat: 1.3, 
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients, 
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const deleteIngredient = (state, action) => {
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs, 
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedSt);
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {//haciendo esto para que se muestren en orden en la hamburguesa, porque en Firebase la ensalada esta debajo//
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 4
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {        
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.DELETE_INGREDIENT: return deleteIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {error: true});
        default: return state;
    }
}

export default reducer;