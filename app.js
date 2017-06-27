const express = require('express');
const bodyParser = require('body-parser');
require('isomorphic-fetch');
const app = express();
const bsl = require('./bsl.js');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/video/hello.html', (req, res) => {
	res.send('BSL api');
});

app.post('/api/bsl', urlencodedParser, (req, res) => {
	bsl(req, res, 'in_channel');
});

app.post('/api/bsl-me', urlencodedParser, (req, res) => {
	bsl(req, res, 'ephemeral');
});

app.post('/api/bsl-test', urlencodedParser, (req, res) => {
	bsl(req, res, 'test');
});

app.listen(process.env.PORT || 8080, () => {
	console.log('listening')
});