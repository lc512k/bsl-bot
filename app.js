const express = require('express');
const bodyParser = require('body-parser');
require('isomorphic-fetch');
const app = express();
const bsl = require('./bsl.js');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
	res.send('BSL api');
});

app.post('/api/bsl', urlencodedParser, (req, res) => {
	bsl(req, res, 'in_channel');
});
app.post('/api/bsl-me', urlencodedParser, (req, res) => {
	bsl(req, res, 'ephemeral');
});

const listen = app.listen(process.env.PORT || 8080, () => {
	console.log('listening')
});