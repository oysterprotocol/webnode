var express = require('express');
var ExpressPeerServer = require('peer').ExpressPeerServer;
var logger = require('morgan');

var app = express();

app.use(logger('dev'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var server = app.listen(8000);

var q = ExpressPeerServer(server, {debug: true});

app.use('/peer', q);

q.on('connection', function (id) {
    console.log('user with ', id, 'connected');
});

q.on('disconnect', function(id) {
  console.log('user with ', id, 'disconnected');
});
