// GET /quizes/question
exports.question = function(req, res) {
	// En views/quizes/question está la página con el formulario
	res.render('quizes/question', {pregunta: 'Capital de Italia:'});
}

// GET /quizes/answer
// La respuesta llega en un GET ==> en la cabecera ==> res.query.respuesta
exports.answer = function(req, res) {
	// En views/quizes/answer está la página con el resultado
	if (req.query.respuesta === 'Roma') {
		res.render('quizes/answer', {respuesta: 'Correcto'});
	} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto'});
	}
}