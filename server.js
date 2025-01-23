const https = require('https');
const fs = require('fs');
const server = require('express');

const app = server();

const options = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem'),
};

app.get('/', (req, res) => {
    res.send('Hello, HTTPS!');
});

https.createServer(options, app).listen(443, () => {
    console.log('Server is running on https://localhost:3000');
});

