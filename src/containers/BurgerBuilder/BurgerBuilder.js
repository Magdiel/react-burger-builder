import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

 
export class BurgerBuilder extends Component {

    state = {
        purchaseable: false,
        purchasing: false
    };

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ingredients[type];
    //     const updatedCounted = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ingredients
    //     };
    //     updatedIngredients[type] = updatedCounted;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice + priceAddition;
    //     //this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.props.onAddIngredient({burger: {ingredients: updatedIngredients, price: newPrice}, ingredientName: type});   
    //     this.updatePurchaseState(updatedIngredients);      
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ingredients[type];
    //     const updatedCount =  oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const ingredientPrice = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice - ingredientPrice;        
    //     this.props.onDeleteIngredient({burger: {ingredients: updatedIngredients, price: newPrice}, ingredientName: type});  
    //     //this.setState({ingredients: updatedIngredients, totalPrice:newPrice});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }else{
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    
    purchaseContinueHandler = () => {
    //     let queryParams = [];
    //     for (let i in this.props.ingredients){
    //         queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ingredients[i]))
    //     }
    //    // queryParams.push('price=' + this.props.price);
    //     const queryString = queryParams.join('&');
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    
    render(){
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if(this.props.ingredients){
            burger = (<Aux>
                        <Burger ingredients={this.props.ingredients}/>                   
                        <BuildControls 
                            ingredientAdded={this.props.onAddIngredient}
                            ingredientRemoved={this.props.onDeleteIngredient}
                            ingredients={this.props.ingredients}
                            disabled={disabledInfo}
                            purchaseable={this.updatePurchaseState(this.props.ingredients)}
                            price={this.props.price}
                            ordered={this.purchaseHandler}
                            isAuth={this.props.isAuthenticated}/>
            </Aux>);
            orderSummary = <OrderSummary ///* Modal *///
                            ingredients ={this.props.ingredients}
                            cancel={this.purchaseCancelHandler}
                            continue={this.purchaseContinueHandler}
                            totalPrice={this.props.price}/>;
        }
        // if(this.state.loading){
        //     orderSummary = <Spinner />
        // }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice.toFixed(2),
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapPropsToState = dispatch => {
    return {
        onAddIngredient: (myIngredients) => dispatch(actions.addIngredient(myIngredients)),
        onDeleteIngredient: (myIngredients) => dispatch(actions.removeIngredient(myIngredients)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapPropsToState)(withErrorHandler(BurgerBuilder, axios));