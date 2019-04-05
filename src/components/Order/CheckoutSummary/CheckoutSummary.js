import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
    
const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <button 
                className="negative ui button"
                onClick={props.cancel}>CANCEL</button>
            <button 
                className="positive ui button"
                onClick={props.continue}>CONTINUE</button>
        </div>
    )
};
    
export default checkoutSummary;