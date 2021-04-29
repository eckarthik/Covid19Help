import React from "react";
import classes from "./Disclaimer.module.css";

const Disclaimer = () => {
  return (
    <div className={classes.disclaimer}>
      <p>
        This website contains crowdsourced data and may not be accurate. 
      </p>
      <p>Use it at your own discretion</p>
    </div>
  );
};

export default Disclaimer;