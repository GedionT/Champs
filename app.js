var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var errorHandler = require('./services/errorHandler');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes setup
app.use('/', require(path.join(__dirname, 'router')));

// error handler
app.use(errorHandler);

module.exports = app;
