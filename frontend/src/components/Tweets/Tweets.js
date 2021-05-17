import React, { useState,useEffect } from 'react';
import Tweet from './Tweet/Tweet';
import {Card} from 'react-bootstrap';
import Loading from '../Loading/Loading';
import classes from './Tweets.module.css';
import axios from 'axios';
import axiosBackend from '../../axios';
import {pageTitles} from '../../constants';
import {useLocation} from 'react-router-dom';

const Tweets = (props) => {

    const [userCity,setUserCity] = useState(null);
    const [tweetIds,setTweetIds] = useState([]);
    const [userRequirement,setUserRequirement] = useState(null);
    const [tweetLoaded,setTweetLoaded] = useState(false);
    const location = useLocation();

    useEffect(() => {
        console.log("User Requirement = ",userRequirement);
        console.log("UserCity = ",userRequirement);
        console.log("location.pathname = ",userRequirement);
        axios.get("https://geolocation-db.com/json/")
            .then(response => response.data)
            .then(userCityResponse => {
                let locationName = location.pathname.replace("/","");
                axiosBackend.get("/api/fetchTweets?location="+userCityResponse["city"]+"&requirement="+pageTitles[locationName])
                    .then(response => response.data)
                    .then(tweetIdsResponse => {
                        setUserCity(userCityResponse["city"]);
                        setTweetIds(tweetIdsResponse);
                        setUserRequirement(pageTitles[locationName]);
                    });
            });
        
        
    },[]);

    const tweetCards = [];
    for(let i=1;i<tweetIds.length;i++) {
        tweetCards.push(<Tweet key={tweetIds[i]} tweetId={tweetIds[i]} />);
    }
    
    return (
        <Card className={classes.TweetsContainer}>
            <Card.Header>
                <p style={{marginBottom:"0px",fontWeight:"bold"}}>Tweets for {userCity}</p>
                <p style={{marginBottom:"0px",fontSize:"12px"}}>Showing Leads for {userRequirement}</p>
            </Card.Header>
            <Card.Body className={classes.TweetsList}>
                <Tweet 
                    key={tweetIds[0]} 
                    tweetId={tweetIds[0]} 
                    onLoad={
                        tweetLoaded ? null : setTweetLoaded(true)
                    }
                    placeholder={(<Loading loadingMessage="Fetching tweets.. Please wait"/>)}
                />
                {tweetCards}
            </Card.Body>
        </Card>
    )

};

export default Tweets;