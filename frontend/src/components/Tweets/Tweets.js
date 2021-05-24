import React, { useState, useEffect } from 'react';
import Tweet from './Tweet/Tweet';
import { Card } from 'react-bootstrap';
import Loading from '../Loading/Loading';
import './Tweets.module.css';
import axios from 'axios';
import axiosBackend from '../../axios';
import { pageTitles } from '../../constants';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';

const Tweets = (props) => {

    const [userCity, setUserCity] = useState(null);
    const [tweetIds, setTweetIds] = useState([]);
    const [userRequirement, setUserRequirement] = useState(null);
    const [tweetLoaded, setTweetLoaded] = useState(false);
    const [cities, setCities] = useState([])
    const location = useLocation();

    useEffect(() => {
        console.log("User Requirement = ", userRequirement);
        console.log("UserCity = ", userRequirement);
        console.log("location.pathname = ", userRequirement);
        axios.get("https://geolocation-db.com/json/")
            .then(response => response.data)
            .then(userCityResponse => {
                let locationName = location.pathname.replace("/", "");
                axiosBackend.get("/api/fetchTweets?location=" + userCityResponse["city"] + "&requirement=" + pageTitles[locationName])
                    .then(response => response.data)
                    .then(tweetIdsResponse => {
                        setUserCity(userCityResponse["city"]);
                        setTweetIds(tweetIdsResponse);
                        setUserRequirement(pageTitles[locationName]);
                    });
            });

        axiosBackend.get("api/citySuggestions")
            .then(response => response.data)
            .then(response => {
                console.log(response);
                let cityObjects = [];
                for(let city of response) {
                    cityObjects.push({
                        value:city.city,
                        label:city.city
                    })
                }
                setCities(cityObjects);
            });
    }, []);

    const onUserCitySearchChange = (searchInput) => {
        if(searchInput.length >= 3) {
            axiosBackend("api/citySuggestions?search="+searchInput)
                .then(response => response.data)
                .then(response => {
                    let cityObjects = [];
                    for(let city of response) {
                        cityObjects.push({
                            value:city.city,
                            label:city.city
                        })
                    }
                    setCities(cityObjects);
                })
        }
        
    };

    const fetchTweetsForSelectedCity = (selectedCity) => {
        setTweetLoaded(false);
        let locationName = location.pathname.replace("/", "");
        axiosBackend.get("/api/fetchTweets?location=" + selectedCity.value + "&requirement=" + pageTitles[locationName])
            .then(response => response.data)
            .then(tweetIdsResponse => {
                setUserCity(selectedCity.value);
                setTweetIds(tweetIdsResponse);
                setTweetLoaded(true);
            });
    }

    const tweetCards = [];
    for (let i = 1; i < tweetIds.length; i++) {
        tweetCards.push(<Tweet key={tweetIds[i]} tweetId={tweetIds[i]} />);
    }



    return (
        <Card className="TweetsContainer">
            <Card.Header>
                <div style={{display:"flex",flexDirection:"row",justifyContent:""}}>
                    <span>Tweets for</span>
                    <div style={{width:"70%",marginLeft:"5px"}}>
                        <Select
                            options={cities}
                            value={{value:userCity,label:userCity}}
                            onInputChange={onUserCitySearchChange}
                            onChange={fetchTweetsForSelectedCity}
                        />
                    </div>
                   
                </div>
                {/* <p style={{ marginBottom: "0px", fontWeight: "bold", }}>Tweets for <Select
                    options={cities}
                    value={{value:userCity,label:userCity}}
                    onInputChange={onUserCitySearchChange}
                /></p> */}
                <p style={{ marginBottom: "0px", fontSize: "12px" }}>Showing Leads for {userRequirement}</p>
            </Card.Header>
            <Card.Body className="TweetsList">
                <Tweet
                    key={tweetIds[0]}
                    tweetId={tweetIds[0]}
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