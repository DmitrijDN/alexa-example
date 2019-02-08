module.exports = function(app) {
	return {
		alexaRoutes: require('./alexaRoutes')(app)
	};
};