import React from 'react';
//import classes from './Order.css';
import Burger from '../Burger/Burger';
    
const order = (props) => {
    const ingredients = [];
    for  (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient, 
            amount: props.ingredients[ingredient]
        })
    }
    
    const ingredientOuput = ingredients.map(ig => {
        return <span key={ig.name}
                     style={{
                         textTransform: 'capitalize',
                         display: 'inline-block',
                         margin: '0 8px',
                         border: '1px solid #ccc',
                         padding: '5px'
                         }}>
                    {ig.name} ({ig.amount})
                </span>
    });

    return(
            <div className="card">
                <div className="image">
                    <Burger ingredients = {props.ingredients} />
                </div>
                <div className="content">
                    <div className="header">{props.customer.name}</div>
                    <div className="meta">
                        <span>{props.customer.email}</span>
                    </div>
                    <div className="description">
                        <p>Ingredients:</p>
                        <span>{ingredientOuput}</span>
                    </div>
                </div>
                <div className="extra content">
                    <span className="right floated">
                        {props.customer.street}
                    </span>
                    <span>                       
                        <p>Price: <strong>USD {props.price}</strong></p>
                    </span>
                </div>
            </div>        
    );
};
    
export default order;