var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rankingsRouter = require('./routes/rankings');
var analyzeData =  require('./routes/analyzeData');
var mapRouter = require('./routes/maps');
var adminRouter = require('./routes/admin');
var dashboard = require('./routes/dashboard');
var multer = require('multer');
var chartRouter = require('./routes/linechart');
var piechartRouter = require('./routes/piechart');
var createRouter = require('./routes/create');
var assert = require('assert');
var app = express();

// var store = new MongoDBStore({
//   uri: 'mongodb://localhost:27017/cmpe280',
//   collection: 'sessionsData'
// });

// store.on('connected', function() {
//     store.client; // The underlying MongoClient object from the MongoDB driver
// });
//
// // Catch errors
// store.on('error', function(error) {
//   assert.ifError(error);
//   assert.ok(false);
// });

app.set('view engine', 'ejs');

app.use(require('express-session')({
  secret: 'cmpe280',
  cookie: {
    maxAge: 1000 * 60 * 60
  },
  // store: store,
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rankings', rankingsRouter);
app.use('/analyzedata', analyzeData);
app.use('/map', mapRouter);
app.use('/admin', adminRouter);
app.use('/dashboard', dashboard);
app.use('/linechart', chartRouter);
app.use('/piechart', piechartRouter);
app.use('/create', createRouter);

module.exports = app;
