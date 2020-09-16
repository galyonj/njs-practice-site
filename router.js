const Profile = require('./profile.js');
const renderer = require('./renderer.js');
const querystring = require('querystring');

const commonHeaders = {
	'Content-Type': 'text/html'
}

// Handle HTTP route GET / and Post / i.e. Home
function home(req, res) {
	// if url === '/' && GET
	if (req.url === '/') {
		if(req.method.toLowerCase() === 'get') {
			res.writeHead(200, commonHeaders);
			// show search field
			renderer.view('header', {}, res);
			renderer.view('search', {}, res);
			renderer.view('footer', {}, res);
			res.end();
		} else {
			// if url == '/' && POST
			// get the post data from request body
			req.on('data', postBody => {
				let body = '' + postBody;
				//console.log(body);
				// extract username
				let qs = querystring.parse(postBody.toString());

				res.writeHead(303, {'Location': '/' + qs.username});
				res.end();
			});
			// redirect to /username
		}
	}
}

// Handle HTTP route GET /:username i.e. galyonjb
function user(req, res) {
	const username = req.url.replace('/', '');
	if (username.length > 0) {
		res.writeHead(200, commonHeaders);
		renderer.view('header', {}, res);
		//get JSON from Treehouse
		const studentProfile = new Profile(username);
		studentProfile.on('end', function (profileJSON) {
			//show profile
			// https://teamtreehouse.com/galyonjb.json
			const val = {
				avatarURL: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				jsPoints: profileJSON.points.JavaScript,
			};
			// simple response
			//res.write(`${val.username} has ${val.badges} badges\n`);
			renderer.view('profile', val, res);

			renderer.view('footer', {}, res);
			res.end();
		});
		studentProfile.on('error', function (error) {
			//show error
			renderer.view('error', { errorMessage: error.message }, res);
			-renderer.view('search', {}, res);
			renderer.view('footer', {}, res);
			res.end();
		});
		// get json from Treehouse
		// on end
		// show profile
		// on error
		// show error
	}
}

module.exports.home = home;
module.exports.user = user;
