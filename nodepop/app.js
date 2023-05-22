var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const LoginController = require('./controllers/loginController');
const i18n = require('./lib/i18nConfigure');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');

require('./lib/connectMongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('x-powered-by', false);

app.locals.title = 'NodePop';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const loginController = new LoginController();

/**
 * Rutas del API
*/
app.use('/api/anuncios', jwtAuthMiddleware, require('./routes/api/anuncios'));
app.post('/api/authenticate', loginController.postAPI);


app.use(i18n.init);
/**
 * Rutas del Browser
*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/features', require('./routes/features'));
app.use('/change-locale', require('./routes/change-locale'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // Comprobar si es error de validación
  if (err.array) {
    // const errorInfo = err.array({ onlyFirstError: true })[0];
    const errorInfo = err.errors[0];
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }

  res.status(err.status || 500);

  // si lo que ha fallado es una petición al API
  // devuelvo el error en formato JSON
  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
