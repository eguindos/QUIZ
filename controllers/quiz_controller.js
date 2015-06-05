// Controlador

// Importamos el modelo
var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res) {
	// Buscamos la pregunta de la tabla de la BD. 
	models.Quiz.findAll().success(function(quiz) {
		// Solo tenemos una pregunta, así que estará en el índice 0
		// En views/quizes/question está la página con el formulario
		res.render('quizes/question', { pregunta: quiz[0].pregunta });
	})
};

// GET /quizes/answer
// La respuesta llega en un GET ==> en la cabecera ==> res.query.respuesta
exports.answer = function(req, res) {
	models.Quiz.findAll().success(function(quiz) {
		// Nuevamente solo tenemos una respuesta que estará en el índice 0
		// En views/quizes/answer está la página con el resultado
		if (req.query.respuesta === quiz[0].respuesta) {
			res.render('quizes/answer', {respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {respuesta: 'Incorrecto'});
		}
	})
};