'use strict';
//Problem: We need a simple way to display a user's badge count and javascript point total from a web browser.

// Create a web server
const http = require('http');
const router = require('./router.js');

http.createServer(function (req, res) {
	router.home(req, res);
	router.user(req, res);
}).listen(3000, '127.0.0.1');
console.log('server running at http://127.0.0.1:3000/');

// Function that handles the reading of files and merge in values from JSON data
// read from file and get a string
// merge values into string

//Solution: Use node.js to perform the profile lookups and serve our template via http
