import React from 'react';
import {TwitterTweetEmbed} from 'react-twitter-embed';

const Tweet = (props) => {
    console.log("Tweet called for tweet ID - ",props.tweetId);
    console.log("Props are = ",props)
    return (
            <TwitterTweetEmbed
                tweetId={props.tweetId}
                options={{
                    cards: 'hidden',
                    conversation: 'none'
                }}
                onLoad={props.onLoad}
                placeholder={props.placeholder}
            />
        
    );
};

export default React.memo(Tweet);