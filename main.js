import express from 'express';
import cors from 'cors';

const app = express();
const users = [];
const tweets = [];

app.use(cors());
app.use(express.json());


app.post('/sign-up', (request, response) => {
    users.push(request.body)
    response.send("OK");
});

app.get('/tweets', (request, response) => {
    const recentTweets = tweets.slice(0, 10);
    const tweetsWithAvatar = recentTweets.map((tweet) => {
        const avatar = findUser(tweet.username).avatar;

        tweet.avatar = avatar;

        return tweet
    });

    response.send(tweetsWithAvatar);
});

app.post('/tweets', (request, response) => {
    tweets.unshift(request.body);
    response.send("OK");
});

function findUser(username) {
    const user = users.find((user) => {
        if (user.username === username) {
            return user
        }
    });

    return user
}


app.listen(5000);  