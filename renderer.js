const fs = require('fs');

function mergeValues(val, content) {
	// cycle over the keys

	for( var key in val) {
		// replace all {{key}} witgh the value from the val object
		content = content.replace('{{' + key + '}}', val[key]);
	}
	// return merged content
	return content;
}

function view(template, val, res) {
	// Read from template files
	let fileContents = fs.readFileSync('./views/' + template + '.html', {encoding: 'utf8'});

	// Insert values into content sections where appropriate
	fileContents = mergeValues(val, fileContents);
	// Write out to the response
	res.write(fileContents);
	//});
}

module.exports.view = view;
