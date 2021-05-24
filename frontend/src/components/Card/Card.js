import React from 'react';
import { Card } from 'react-bootstrap';
import classes from './Card.module.css';
import { Link } from 'react-router-dom';

const HomepageCard = (props) => {
    let card = <Card className={classes.Card}>
        {/* <Card.Img variant="top" src={props.imgSrc} style={{width:"200px",height:"200px",margin:"auto"}}/> */}
        <div className={classes.CardIcon} style={{ color: props.iconColor }}>
            <i className={props.fontAwesomeIcon}></i>
        </div>
        <Card.Body>
            <Card.Text className={classes.CardText}>
                {props.cardText}
            </Card.Text>
        </Card.Body>
    </Card>;

    let wrapperLink = null;
    if (props.externalLink) {
        wrapperLink = <a target="_blank" href={props.link} style={{ textDecoration: "none" }}>
            {card}
        </a>
    }
    else {
        wrapperLink = <Link to={props.link} style={{ textDecoration: "none" }}>
            {card}
        </Link>
    }
    return (
        wrapperLink
    )
};

export default HomepageCard;