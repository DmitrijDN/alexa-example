const 
    apiResponse = require('express-api-response'),
    path = require('path');

module.exports = function(app) {
	app.get('/test/', function(req, res, next) {
		console.log('IN TEST ROUTE');
		res.data = {message: 'WORKS!'};
		res.err = null;
		next();
	}, apiResponse);
	
	app.get('*', function(req, res, next) {
        res.header = ('Content-Type', 'text/html');
        res.sendFile(path.resolve(__dirname + `/../../../dist/index.html`));
	});
};
