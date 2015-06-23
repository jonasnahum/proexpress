var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var csrf = require('csurf');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var responseTime = require('response-time');
var serveIndex = require('serve-index');
var busboy = require('connect-busboy');
var serveIndex = require('serve-index');




var monadsFactory = require('./monads/monad');
var monads = monadsFactory();





var routes = require('./routes/index');
var users = require('./routes/users');
var layouts = require('./routes/layouts');
var params = require('./routes/url');
var requ = require('./routes/requ');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('x-powered-by', false)
app.set('json spaces', 2);
app.set('json replacer', function(key, value){
  if (key === 'title')
    return undefined;
  else
    return value;
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(monads.setAppName(app));//al obj app le pone req.appName.
app.use(monads.exampleOfPort(app));//pone el puerto a req.port.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("texto para signar las signedcookies"));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(__dirname + '/public/images'));
app.use(session({
  secret: 'maria tiene un corderito',
  resave: false,
  saveUninitialized: true
}));
app.use("/session", csrf({ cookie: true }));
app.use(function(req, res, next){
    req.appName = app.get('appName');
    next();
});
app.use(errorHandler());
app.use(methodOverride('_method'));
app.use(responseTime(4));//numero digitos
app.use('/shared', serveIndex(
        path.join('public','shared'),
        {'icons': true}
));
app.use('/upload', busboy({immediate: true }));


var reqHand = function (request, response) {
    response.send("hola soy un handler");
}

app.all('/layouts', reqHand);


app.use('/', routes);
app.use('/users', users);
app.use('/layouts', layouts);
app.use("/params", params);
app.use("/request", requ);


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
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
