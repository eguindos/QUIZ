// Controlador

// Importamos el modelo
var models = require('../models/models.js');

// Notar que en los dos MW primeros, usamos un find (en la bd) 
// del Identificador que viene en req.params.quizId. El then (que 
// sustituye al success de versiones anteriores) es lo que se 
// hace cuando se tiene éxito en la búsqueda

// GET /quizes/:quizId
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz: quiz });
	})
};

// GET /quizes/:quizId/answer
exports.answer = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		if (req.query.respuesta === quiz.respuesta) {
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
		}		
	})
};

// GET /quizes  <-- Index
// En este caso usamo findAll()
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs', { quizes: quizes });
	})
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
