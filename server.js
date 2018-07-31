const express = require('express');
const app = express();
const server = require('http').Server(app);
const socketio = require('socket.io')(server);
const bodyParser = require('body-parser');

const config = require(__dirname + '/config');
const port = config.SYSTEM.PORT;

const Logger = require(__dirname + '/lib/Logger');
const mongodb = require(__dirname + '/lib/MongoService');

// middlewares
app.use(function (req, res, next) {
	Logger.access(req);
	next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public/static'));

// Includes Router
app.use('/football', require('./Controller/FootballController'));

socketio.on('connection', function (socket) {
	socket.emit('hi', 'hi');

	socket.on('status', function (message) {
		let data = JSON.parse(message);
		socket.emit(`status${data.client}`, 'result');
	});

});



const serverOnCreate = function () {
	server.listen(port, async function () {
		await mongodb.connect();
		serverOnStart();
	});
}

const serverOnStart = function () {
	Logger.info(`Thread [${process.pid}] start`);
	Logger.info(`Server Info: `);
	Logger.info(`Start Time \t: ${Date()}`);
	Logger.info(`listening on \t: ${port}`);
}

serverOnCreate();