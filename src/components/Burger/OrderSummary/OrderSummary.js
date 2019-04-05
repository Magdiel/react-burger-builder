import React, {Component} from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
//import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //This could be a functional component, doesn't have to be a class component
    componentWillUpdate(){
        //console.log('[OrderSummary] will update');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                    <li key={igKey}>
                        <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li> );
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <h4>Total Price: <strong>{this.props.totalPrice}</strong></h4>
                <p>Continue to Checkout?</p>
                <button onClick={this.props.cancel} className="ui button">Cancel</button>
                <button className="ui primary button" onClick={this.props.continue}>Continue</button>
                {/* <Button btnType="Danger" clicked={this.props.cancel}>CANCEL</Button>
                <Button btnType="Success"clicked={this.props.continue}>CONTINUE</Button> */}
            </Aux>
        );
    };
}
    
export default OrderSummary;