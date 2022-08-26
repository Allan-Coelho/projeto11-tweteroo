import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const users = [];
const tweets = [];
app.use(express.json()); //Tells to node.js that this application handle JSON requests


app.post('/sign-up', (request, response) => {
    users.push(request.body)
    response.send("OK");
});

app.get('/tweets', (request, response) => {
    const recentTweets = tweets.slice(0, 10);
    const tweetsWithAvatar = recentTweets.map((tweet) => {
        const avatar = users.find((user) => {
            if (user.username === tweet.username) {
                return user
            }
        }).avatar;
        tweet.avatar = avatar;
        console.log(tweet)
        return tweet
    })

    response.send(tweetsWithAvatar);
});

app.post('/tweets', (request, response) => {
    tweets.unshift(request.body);

    response.send("OK");
});




app.listen(5000);  