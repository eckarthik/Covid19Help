import React from 'react';
import classes from './Alert.module.css';

const Alert = (props) => {
    return (
        <div className={classes.Alert} style={{backgroundColor:props.alertColor}}>
            <p className={classes.AlertMessage} style={{color:props.alertMessageTextColor}}>{props.alertMessage}</p>
        </div>
    );
};

export default Alert;