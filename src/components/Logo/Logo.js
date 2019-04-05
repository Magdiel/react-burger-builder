import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => {
    return(
        <img src={burgerLogo} style={{height: props.height}} alt="logo" />
    );
    
};
    
export default logo;