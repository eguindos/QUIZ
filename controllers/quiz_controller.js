// Controlador

// Importamos el modelo
var models = require('../models/models.js');

// Autoload - Factoriza el código si la ruta incluye :quizId. Lo que 
// hace es lanzar una búsqueda del id pasado y si lo encuentra, 
// lo que hace es asignarlo a req.quiz directamente y hace el next 
// para que se ejecute el MW que toque. Si no lo encuentra, lanza 
// el error de que no existe. Si ocurre algún error en la búsqueda
// entonces lanza el catch para que se muestre el error. Resumiendo, 
// miramos directamente los datos de id y los ponemos en req.quiz, para
// que los siguiente MW sepan de lo que hablamos con solo consultar 
// esa variable req.quiz. Si algo va mal, lo mostramos.
exports.load = function(req, res, next, quizId) {
	models.Quiz.find({
		where: { id: Number(quizId) },
		include: [{ model: models.Comment }]
	}).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz; 
				next();
			} else { next (new Error('No existe quiz id = ' + quizID)); }
		}
	).catch(function(error) { next(error); });
};

// GET /quizes  <-- Index
// En este caso usamo findAll()
// Como desde la última versión, ejecutamos then. Pero, al final de 
// él usamos el catch que nos pilla los errores que han surgido del
// proceso de findAll(). Si va bien then. Si error catch
exports.index = function(req, res, next) {
	// Si el parámetro quiery.busco viene con algo, buscamos
	if (req.query.busco) {
		// Preparamos lo que busco sobre la variable buscoMod
		console.log ("busco " + req.query.busco);
		var buscoOri = "%"+req.query.busco+"%"; 
		var buscoMod = buscoOri.replace(/ /g, '%');
		// Buscamos en la BD lo que nos piden y lo ordenamos de forma descendente
		models.Quiz.findAll({where: ["pregunta like ?", buscoMod]}, 
			                {order: 'pregunta DESC'}).then(
			function(quizes) {
				console.log("OK - Busqueda pedida: " + req.query.busco + 
					        " - Lo que buscamos realmente: " + buscoMod);
				res.render('quizes/index', { quizes: quizes, errors: [] });
			}
		).catch(function(error) { next(error); });
	// Si el parámetro query.busco viene vacío, mostramos todas las preguntas 
	// Esto se produce al clicar sobre 	'Preguntas'  en el menú lateral                
	} else {
		models.Quiz.findAll().then(
			function(quizes) {
				res.render('quizes/index', { quizes: quizes, errors: [] });
			}
		).catch(function(error) { next(error); })
	}
};

// Notar que en los dos MW primeros, usamos un find (en la bd) 
// del Identificador que viene en req.params.quizId. El then (que 
// sustituye al success de versiones anteriores) es lo que se 
// hace cuando se tiene éxito en la búsqueda

// GET /quizes/:quizId
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz: req.quiz, errors: [] });
	})
};

// GET /quizes/:quizId/answer
exports.answer = function(req, res) {
	console.log("Respuesta: " + req.query.respuesta  + " - La correcta es: " + req.quiz.respuesta);
	var resultado = 'Incorrecto'
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto'
	}
	res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: [] });
};

// GET /quizes/new - Controlador para la creación de preguntas
exports.new = function(req, res) {
	// Objeto quiz
	var quiz = models.Quiz.build(
		{ pregunta: "Pregunta", respuesta: "Respuesta", tema: "Otro" }
	);
	res.render('quizes/new', { quiz: quiz, errors: [] });
};

// POST /quizes/create --> Para crear algo hay que usar post según REST.
exports.create = function(req, res) {
	// Extraemos pregunta y respuesta del body
	var quiz = models.Quiz.build(req.body.quiz)
	// Guradar en DB los camos de quiz - solo los campos preguntas y respuestas	
	// esto es para evitar que nos metan otros campos que pudiesen tener virus
	// Hacemos validación previa por si se produjo error al meter datos
	quiz.validate().then(function(err) {
		if (err) {
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
		} else {
			quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function() {
			res.redirect('/quizes')})	
		}
	});
};

// GET quizes/:quizId/edit - Edición de preguntas
// El identificador dispara automáticamente el autoload, por lo que el 
// objeto quiz se construirá con el elemento de la tabla 
exports.edit = function(req, res) {
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: [] });
};

// PUT /quizes/:quizId - DB Update - Parecido a create
exports.update = function(req, res) {

	// Extraemos pregunta y respuesta de la solicitud que está en el body
	req.quiz.pregunta  = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema      = req.body.quiz.tema;

	// Validamos y salvamos
	req.quiz.validate().then(function(err) {
		if(err) {
			res.render('quizes/edit', { quiz: req.quiz, errors: err.errors });
		} else {
			// Ojo, solo salvamos los campos que necesitamos para evitar que se 
			// metan otros campos con virus.
			req.quiz.save( { fields: ["pregunta", "respuesta", "tema"]}).then(function() {
				res.redirect('/quizes');
			});
		}
	});
};

// DELETE /quizes:quizId - Destroy -> borrado
// Al llevar un quizId se habrá lanzado el autoload, por lo que quiz
// ya tiene lo que queremos borrar
exports.destroy = function(req, res) {
	req.quiz.destroy().then(function() {
		res.redirect('/quizes');
	}).catch(function(error) {next(error)});
};
