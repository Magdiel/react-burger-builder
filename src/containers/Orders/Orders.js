import React , {Component}from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
//import dash from '../../axios-dashquest';
//import classes from './Orders.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'
    
class Orders extends Component {
    
    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        axios.get('orders.json')
            .then(response => {
                const fetchedOrders= [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                       id: key})
                }        
                this.setState({loading: false, orders: fetchedOrders})                
            }).catch(err=>{
                this.setState({loading: false})
            });

            

        // fetch('https://jsonplaceholder.typicode.com/posts/')
        //     .then(response => {
        //         console.log(response);
        // }).catch(err => {
        //     this.setState({loading:false});
        // })
    }

    render() {
        let orders = <div style={{textAlign: 'center'}}>
                        <h3>Please order something!</h3>
                        <Spinner />
                    </div>;
        if(!this.state.loading){
            orders = <div className="ui three stackable cards ">
                        {this.state.orders.map(order => {
                            return <Order key={order.id} 
                                            ingredients={order.ingredients}
                                            price={order.price}
                                            customer={order.orderData}/>
                        })}
                    </div>;
        }
        return orders;
    }
};
    
export default withErrorHandler(Orders, axios);