import React , {Component}from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
//import dash from '../../axios-dashquest';
//import classes from './Orders.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
    
class Orders extends Component {
    
    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <div style={{textAlign: 'center'}}>
                        <h3>Please order something!</h3>
                        <Spinner />
                    </div>;
        if(!this.props.loading){
            orders = <div className="ui three stackable cards ">
                        {this.props.orders.map(order => {
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

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapPropstoState = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}
    
export default connect(mapStateToProps, mapPropstoState) (withErrorHandler(Orders, axios));