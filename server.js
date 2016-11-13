var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

// let app be served on port 3000
var port = 3000;

// the app
var app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));  // views will be in views folder
app.set('views engine', 'ejs');	                  // specify engine as ejs
app.engine('html', require('ejs').renderFile);    // to render html files

// angular stuff will go to static folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendend: false}));

// routes
app.use('/', index);	// NOTE the root path of home  controller will be /
app.use('/api', tasks); // NOTE the root path of tasks controller will be /api

// let express start to serve the app
app.listen(port, function() {
	console.log('Server started at port:' + port);
});