import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {        
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state, 
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
                },
                totalPrice: +action.payload.burger.price.toFixed(2)
            }            
        case actionTypes.DELETE_INGREDIENT:
             return {
                ...state, 
                ingredients: {
                    ...state.ingredients,
                   [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
                },
                totalPrice: +action.payload.burger.price.toFixed(2),
             }
        default:
            return {
                ...state
            }
    }
}

export default reducer;