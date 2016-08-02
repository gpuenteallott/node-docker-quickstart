'use strict';

var _IP = '0.0.0.0';
var _PORT = 80;
var _SECURE_PORT = 443;

var http = require('http'),
	fs = require('fs'),
	https = require('https'),
	express = require('express'),
	partials = require('express-partials'),
	bodyParser = require('body-parser'); // for POST request parameters parsing into req.body automatically

var cluster = require('cluster'),
	numCPUs = require('os').cpus().length;

// ---------------------------------------------

var app = express();

app.set('view engine', 'ejs');
app.use(partials());

// Returns middleware that only parses urlencoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json request parameters. BackboneJS sends params in json format by default
app.use(bodyParser.json());

// set public directory for assets like css and js files
app.use(express.static(__dirname + '/public'));

// explicitly indicate views directory, as it was failing otherwise
app.set('views', __dirname + "/server/views");

// controller actions
var indexController = require("./server/controllers/indexController");
app.all('*', indexController.index);

// ---------------------------------------------
// Multi thread server, thanks to @greggilbert

if (cluster.isMaster) {

	// Fork workers.
	console.log('Clustering into ' + numCPUs + ' threads.');
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', function( deadWorker, code, signal ) {
		// Restart the worker
		var worker = cluster.fork();

		// Note the process IDs
		var newPID = worker.process.pid;
		var oldPID = deadWorker.process.pid;

		// Log the event
		console.log('Worker '+oldPID+' died.');
		console.log('Worker '+newPID+' born.');
	});
}
else {
	// Start app
	app.listen(_PORT, _IP, function(){
		// Put a friendly message on the terminal
		console.log(new Date() + ' - Server running at http://'+_IP+'/'+_PORT);
	});

	// Start HTTPS as well
	var privateKey = fs.readFileSync('etc/certs/project.key');
	var certificate = fs.readFileSync('etc/certs/project.crt');

	var options = {
		key: privateKey,
		cert: certificate
	};

	https.createServer(options, app).listen(_SECURE_PORT);
}