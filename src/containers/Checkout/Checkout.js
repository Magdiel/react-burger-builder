import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    componentDidMount(){
        // const queryString = require('query-string');
        // let ingredients = queryString.parse(this.props.location.search);
        // let price = 5.84;
        // for (let param in ingredients){
        //     // //if(param === 'price'){
        //     //     ingredients.slice(param);
        //     //     price = +param;
        //     // }else{
        //         ingredients[param] = +ingredients[param];
        //     //}
            
        // }           
        // this.setState({ingredients: ingredients, price: price});
    }

    goBackHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    cancel={this.goBackHandler}
                    continue={this.continueHandler}
                    />
                <Route path={this.props.match.path + '/contact-data'} 
                       render={(props) => (<ContactData 
                                                ingredients={this.props.ingredients} 
                                                price={this.props.price} 
                                                {...props}/>)}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);