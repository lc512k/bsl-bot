//curl -H Content-Type: application/x-www-form-urlencoded -X POST -d string=hello http://localhost:8080/api/

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

	const word = req.body.text;

	const source1 = `${host}/signmonkey/mp4/${word}.mp4`;
	const source2 = `${host}/signstation/${word}.mp4`;

	race([findVideo(source1), findVideo(source2)])
		.then((url) => {
			let response = {
				response_type: slackResponseType,
				text: url
			}

			if (slackResponseType === 'test'){
				response = {
					response_type: slackResponseType,
					text: 'https://www.youtube.com/watch?v=Nck6BZga7TQ'
				}
			}

			// const response = {
			// 	version: '1.0',
			// 	response_type: slackResponseType,
			// 	type: 'video',
			// 	url: url,

			// 	width: 600,
			// 	height: 400,
			// 	title: 'Reception',
			// 	author_name: 'Vidiot',
			// 	// author_url: http://mlkshk.com/user/Vidiot,
			// 	provider_name: 'MLKSHK',
			// 	text: url
			// 	// provider_url: http://mlkshk.com/
			// }
			// console.log('sending back', response)

			res.send(response);
		})
		.catch((e) => {
			res.send(e)
		});
}