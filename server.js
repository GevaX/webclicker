const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname)));
const Pusher = require('pusher');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const API_ID = process.env.API_ID;
const API_SECRET = process.env.API_SECRET;

const pusher = new Pusher({
    appId: API_ID,
    key: API_KEY,
    secret: API_SECRET,
    cluster: "eu",
    useTLS: true
});

app.get('/', (req,res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.get('/vote', (req, res) => {
    let item = req.query.item_id;
    pusher.trigger('counter', 'vote', {item: item});
    res.status(200).send();
});
const port = 5000;
app.listen(port, () => { console.log(`App listening on port ${port}!`)});