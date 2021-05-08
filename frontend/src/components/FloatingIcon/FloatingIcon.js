import React from 'react';
import classes from './FloatingIcon.module.css';

const FloatingIcon = (props) => {
    let iconClasses = props.iconClassNames.split(" ");
    iconClasses.push(classes.FloatingIcon);
    console.log("Icon Classes = ",iconClasses);
    return (
        <div className={classes.Float} onClick={props.onClicked}>
            <i className={iconClasses.join(" ")}></i>
        </div>
    );
}

export default FloatingIcon;