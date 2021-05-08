import React from 'react';
import {TwitterTweetEmbed} from 'react-twitter-embed';

const Tweet = (props) => {
    console.log("Tweet called for tweet ID - ",props.tweetId)
    return (
            <TwitterTweetEmbed
                tweetId={props.tweetId}
                options={{
                    cards: 'hidden'
                }}
                onLoad={props.onLoad}
                placeholder={props.placeholder}
            />
        
    );
};

export default Tweet;