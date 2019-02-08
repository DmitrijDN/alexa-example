const bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path'),
    apiResponse = require('express-api-response'),
    https = require('https'),
    port = 443,
    fs = require('fs'),
    privateKey  = fs.readFileSync(__dirname + 'path to *.pem', 'utf8');
    certificate = fs.readFileSync(__dirname + 'path to *.crt ', 'utf8');

const app = express();

// empty arrays don't throw 404 response error
apiResponse.options({
    emptyArrayIsOk: true
});

app.use('/dist', express.static(path.resolve(__dirname + '/../dist')));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: false}));

const viewRoutes = require('./routes/view/routes')(app);
const apiRoutes = require('./routes/api/routes')(app);

console.log(`app runs on port: ${port}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);


const credentials = {key: privateKey, cert: certificate};
httpsServer = https.createServer(credentials, app);
httpsServer.listen(port);
const io = require('socket.io')(httpsServer);
const sockets = require('./middleware/socketMiddleware')(io);

module.exports = app;