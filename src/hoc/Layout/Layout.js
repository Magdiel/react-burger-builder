import React, {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };
    
    sideDrawerClosedHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render(){
        return(
            <Aux>
                <Toolbar clicked={this.sideDrawerClosedHandler} isAuth={this.props.isAuthenticated}/>
                <SideDrawer isAuth={this.props.isAuthenticated} 
                            closed={this.sideDrawerClosedHandler} 
                            open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps) (Layout);