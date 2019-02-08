const 
    apiResponse = require('express-api-response'),
    path = require('path'),
    socketService = require('../../services/socketService');
let interval = null;

module.exports = function(app) {
    app.post('/pause', (req, res, next) => {
        res.data = {message: 'success'};
        res.err = null;
        clearInterval(interval);
        console.log('Interval cleared');
        next();
    }, apiResponse);
    
	app.post('/point', (req, res, next) => {
        console.log('Point', req.body.data);
        clearInterval(interval);
        const point = {
            y: req.body.data
        };
        socketService.SendToAllUsers('point', point);
        res.data = {message: 'success'};
        res.err = null;
        next();
    }, apiResponse);
    
    app.post('/drawRandom', (req, res, next) => {
        console.log('DRAW RANDOM');
        interval = setInterval(() => {
            const point = {
                y: Math.random() * 1000
            };
            if(Math.random() < 0.5) {
                point.y = point.y * -1;
            }

            console.log(point);
            socketService.SendToAllUsers('point', point);
        }, 1000);
        res.data = {message: 'success'};
        res.err = null;
        next();
    }, apiResponse);
    
    app.post('/changeChart', (req, res, next) => {
        console.log('CHANGE CHART');
        const data = {
            chartType: req.body.data.toLowerCase().indexOf('linear') !== -1 ? 'curveLinear': 'curveStep'
        };
        socketService.SendToAllUsers('chartType', data);
        res.data = { message: 'success' };
        res.err = null;
        next();
    }, apiResponse);
    
    app.post('/clear', (req, res, next) => {
        console.log('Chart has been cleared');
        clearInterval(interval);
        socketService.SendToAllUsers('clearChart', []);
        res.data = { message: 'success' };
        res.err = null;
        next();
    });
};
