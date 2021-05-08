import tweepy as tw
from twitter_credentials import ACCESS_TOKEN, ACCESS_TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET

auth = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tw.API(auth, wait_on_rate_limit=True)

search_words = ["#ICU", "Ventilator", "Urgent"]
date_since = "2021-05-06"

tweets = tw.Cursor(api.search, q=search_words, lang="en", since=date_since).items(10)

for tweet in tweets:
    print(tweet.id,tweet.text)