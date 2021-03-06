var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var flash = require('connect-flash');
var routes = require('./routes/index');
var users = require('./routes/users');
var menus = require('./routes/menus');
var shelfs=require('./routes/shelfs');
var categories=require('./routes/categories');
var books=require('./routes/books');
var url = require('url');
var RedisStore = require('connect-redis')(session);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(cookieParser('keyboard cat'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1); // trust first proxy

app.use(session({
	store : new RedisStore({
		host : "127.0.0.1",
		port : 6379,
		db :1
	}),
	key : 'sid',
	secret : 'keyboard cat',
	resave : false,
	saveUninitialized : true,
	cookie : {
		maxAge : 60*1000*60*2,
		path : '/',
		httpOnly : true
	}
}));
app.use(flash());
var notNeedLogin = {
	'/login' : true,
	'/users/login' : true
};
app.use(function(req, res, next) {
	var pathName = url.parse(req.url).pathname;
	if (pathName.indexOf('.') > 0 || notNeedLogin[[ pathName ]]) {
		next();
		return;
	}
	var loginUser = req.session.loginUser;
	if (loginUser && loginUser.isLogin) {
		res.locals.user = loginUser;
		next();
		return;
	} else {
		res.redirect('/login');
	}
});
app.use('/', menus);
app.use('/', routes);
app.use('/users', users);
app.use('/shelfs', shelfs);
app.use('/books', books);
app.use('/categories', categories);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err,
			layout : false
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {},
		layout : false
	});
});

module.exports = app;
