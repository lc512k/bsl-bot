//curl -H "Content-Type: application/x-www-form-urlencoded" -X POST -d string=hello http://localhost:8080/api/

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

const host = 'https://media.signbsl.com/videos/bsl';

module.exports = function(req, res, slackResponseType) {
	console.log(JSON.stringify(req.body, null, 2));

	// TODO check token
	// https://api.slack.com/slash-commands

	const word = req.body.text;

	const url1 = `${host}/signmonkey/mp4/${word}.mp4`;
	const url2 = `${host}/signstation/${word}.mp4`;

	// TODO rat race it

	const url = url1;

	console.log('requesting ', word, url)

	fetch(url)
		.then(function(response) {
			if (response.status >= 400) {
				console.log('not found')
				res.send('not found');
			}
			else {

				const response = {
					response_type: slackResponseType,
					text: url
				}

				console.log('found');
				res.send(response);
			}
		})
		.catch(function(e) {
			res.send('service is down');
			console.log(e);
		});
}