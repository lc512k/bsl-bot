//curl -X POST -d text=hello http://localhost:8080/api/bsl/

// token=gIkuvaNzQIHg97ATvDxqgjtO
// team_id=T0001
// team_domain=example
// enterprise_id=E0001
// enterprise_name=Globular%20Construct%20Inc
// channel_id=C2147483705
// channel_name=test
// user_id=U2147483697
// user_name=Steve
// command=/weather
// text=94070
// response_url=https://hooks.slack.com/commands/1234/5678

const race = require('promise-rat-race');

const host = 'https://media.signbsl.com/videos/bsl';

const findVideo = (url) => {

	return new Promise ((resolve, reject) => {
		fetch(url)
			.then((response) => {
				if (response.status >= 400) {
					reject('not found');
				}
				else {
					resolve(url);
				}
			})
			.catch(() => {
				reject('service down');
			});
	});
}

module.exports = (req, res, slackResponseType) => {
	// TODO check token
	// https://api.slack.com/slash-commands

	const word = encodeURI(req.body.text);

	const source1 = `${host}/signmonkey/mp4/${word}.mp4`;
	const source2 = `${host}/signstation/${word}.mp4`;
	const source3 = `${host}/BenFletcherTechSigns/mp4/${word}.mp4`

	const response = {
		response_type: slackResponseType
	};

	console.log('searching for ', word);

	race([findVideo(source1), findVideo(source2), findVideo(source3)])
		.then((url) => {
			console.log('found ', url);
			response.text = url;
			console.log('response ', response);
			res.send(response);
		})
		.catch((e) => {
			// Default to the main site search
			console.log('response (default)', response);
			response.text = `http://www.signbsl.com/sign/${word}`;
			res.send(response);
		});
}