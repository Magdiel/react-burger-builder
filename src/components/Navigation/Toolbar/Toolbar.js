import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
    
const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <div>
                <DrawerToggle                     
                    clicked={props.clicked}/>
            </div>
            <Logo height="50%"/>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    );
};
    
export default toolbar;