// Session controller

// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};

// GET /login 
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};

// POST /login - Crear la sesión
exports.create = function(req, res) {
	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user) {

		if (error) {
			req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
			res.redirect("/login");
			return;
		}

		// Crear req.session.user y guardar campos id y username
		req.session.user = {id:user.id, username:user.username};

		// Hora de comienzo de la sesión: 
		req.session.ts = Math.floor(Date.now()/1000) || function() {return new Math.floor(Date().getTime()/1000)};

		// Redireccionamiento
		res.redirect(req.session.redir.toString()); // Redirecc. a path anterior a login
	});
};

// DELETE /logout
exports.destroy = function(req, res) {
	delete req.session.user; 
	res.redirect(req.session.redir.toString());
};