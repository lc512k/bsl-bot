const express = require('express');
const bodyParser = require('body-parser');
require('isomorphic-fetch');
const app = express();
const bsl = require('./bsl.js');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/video/hello.html', (req, res) => {
	res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Vimeo Javascript oEmbed Example</title>
    <script>
        // This is the URL of the video you want to load
        var videoUrl = 'http://www.vimeo.com/7100569';
        // This is the oEmbed endpoint for Vimeo (we're using JSON)
        // (Vimeo also supports oEmbed discovery. See the PHP example.)
        var endpoint = 'http://www.vimeo.com/api/oembed.json';
        // Tell Vimeo what function to call
        var callback = 'embedVideo';
        // Put together the URL
        var url = endpoint + '?url=' + encodeURIComponent(videoUrl) + '&callback=' + callback + '&width=640';
        // This function puts the video on the page
        function embedVideo(video) {
            document.getElementById('embed').innerHTML = unescape(video.html);
        }
        // This function loads the data from Vimeo
        function init() {
            var js = document.createElement('script');
            js.setAttribute('type', 'text/javascript');
            js.setAttribute('src', url);
            document.getElementsByTagName('head').item(0).appendChild(js);
        }
        // Call our init function when the page loads
        window.onload = init;
    </script>
</head>
<body>

    <h1>Vimeo Javascript oEmbed Example</h1>
    <div id="embed">Loading video...</div>

</body>
</html>


		`);
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