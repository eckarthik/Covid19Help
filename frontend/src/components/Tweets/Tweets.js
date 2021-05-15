import React, { useState, useEffect } from 'react';
import Tweet from './Tweet/Tweet';
import { Card } from 'react-bootstrap';
import Loading from '../Loading/Loading';
import classes from './Tweets.module.css';
import axios from 'axios';
import Select from 'react-select'
const Tweets = (props) => {

    const [userCity, setUserCity] = useState(null);

    useEffect(() => {
        axios.get("https://geolocation-db.com/json/")
            .then(response => response.data)
            .then(response => {
                setUserCity({ "label": response["city"], "value": response["city"] });
            })
    }, [])

    const [tweetLoaded, setTweetLoaded] = useState(false);
    const tweetIDs = ["1390916742906580994", "1390915959876116481", "1390912576800759810",
        "1390880977283534848", "1390876416019812359", "1390870953471614977", "1390867439169142788", "1390863814262890496",
        "1390863468945842177"];
    const tweetCards = [];
    tweetIDs.map(tweet => {
        return tweetCards.push(<Tweet key={tweet} tweetId={tweet} />);
    });

    return (
        <Card className={classes.TweetsContainer}>
            <Card.Header>
                <p style={{ marginBottom: "unset", fontWeight: "bold" }}>Tweets for</p>
                <Select
                    value={userCity}
                    options={[{ 'label': 'Bengaluru', 'value': 'Bengaluru' }, { 'label': 'Hyderabad', 'value': 'Hyderabad' }]}
                />
                <p style={{ marginBottom: "unset", fontSize: "12px" }}>Showing Leads for Hospital Beds</p>
            </Card.Header>
            <Card.Body className={classes.TweetsList}>
                <Tweet
                    key={"1390917048117592065"}
                    tweetId={"1390917048117592065"}
                    onLoad={
                        tweetLoaded ? null : setTweetLoaded(true)
                    }
                    placeholder={(<Loading loadingMessage="Fetching tweets.. Please wait" />)}
                />
                {tweetCards}
            </Card.Body>
        </Card>
    )

};

export default Tweets;