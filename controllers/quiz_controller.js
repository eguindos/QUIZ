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
	models.Quiz.find(quizId).then(
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
exports.index = function(req, res) {
	models.Quiz.findAll().then(
		function(quizes) {
			res.render('quizes/index', { quizes: quizes });
		}
	).catch(function(error) { next(error); })
};

// Notar que en los dos MW primeros, usamos un find (en la bd) 
// del Identificador que viene en req.params.quizId. El then (que 
// sustituye al success de versiones anteriores) es lo que se 
// hace cuando se tiene éxito en la búsqueda

// GET /quizes/:quizId
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz: req.quiz });
	})
};

// GET /quizes/:quizId/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto'
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto'
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

/*

// Dejo la forma antigua para referencia

// GET /quizes/question
exports.question = function(req, res) {
	// Buscamos la pregunta de la tabla de la BD. 
	models.Quiz.findAll().then(function(quiz) {
		// Solo tenemos una pregunta, así que estará en el índice 0
		// En views/quizes/question está la página con el formulario
		res.render('quizes/question', { pregunta: quiz[0].pregunta });
	})
};
*/
/*
// GET /quizes/answer
// La respuesta llega en un GET ==> en la cabecera ==> res.query.respuesta
exports.answer = function(req, res) {
	models.Quiz.findAll().then(function(quiz) {
		// Nuevamente solo tenemos una respuesta que estará en el índice 0
		// En views/quizes/answer está la página con el resultado
		if (req.query.respuesta === quiz[0].respuesta) {
			res.render('quizes/answer', {respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {respuesta: 'Incorrecto'});
		}
	})
};
*/
