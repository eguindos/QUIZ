var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session'); 

var routes = require('./routes/index');

var app = express();

// view engine setup
// Aquí es como asignar valores a nombres. Pdríamos verlos con app.get('nombre')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Montamos los MW que necesitamos
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded()); // Quitamos el extended = false, para tratar bien los pars del body
app.use(cookieParser('Quiz 2015')); // Añadir semilla 'Quiz 2015' para cifrar cookie con el MW session
app.use(partials());
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinámicos
app.use(function(req, res, next) {

    // Guardar path de la solicitud que llega en session.redir para despues login
    if (!req.path.match(/\/login|\/logout/)) {
        req.session.redir = req.path;
    }

    // Hacer visible req.session en las vistas
    res.locals.session = req.session;
    next();
});

// Control de tiempo de sesión para auto-logout
// Miramos el timestamp actual y, una vez tengamos abierta una sesión, iniciamos la cuenta atrás (30 segundos)
app.use(function(req, res, next) {
    var ahora = Math.floor(Date.now()/1000) || function() {return new Math.floor(Date().getTime()/1000)};
    var date = new Date;

    res.locals.dt = date.toTimeString().slice(0, 5) + " Sin sesión";
    
    // Si hay sesión, reiniciamos el contador de 30 segundos

    if (res.locals.session.user) {
        if (ahora > expira) { 
            console.log("*** Auto-logout de sesion ***");
            res.redirect("/logout");
        } else {
            res.locals.dt = res.locals.dt.slice(0, 5) + " Sesión activa";
        }
        expira = ahora + 30;  // Reiniciamos el contador de 30 segundos de inactividad

    } else { expira = 9999999999999; }

    next();
});

app.use('/', routes);

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
            error: err, 
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;
