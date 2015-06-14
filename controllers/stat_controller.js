// Controlador de estadísticas

// Importamos el modelo
var models = require('../models/models.js');

// GET /quizes/statistics  <-- Estadísticas

// Total de preguntas
exports.totQzs = function(req, res, next) {

	models.Quiz.count({
		where: "pregunta != ''"
	}).then(function(quizes) {
		console.log("OK - Total Preguntas: " + quizes);
		res.locals.totQuizes = quizes;
		next();
	}).catch(function(error) { next(error); });
}

// Total de comentarios
exports.totComs = function(req, res, next) {

	models.Comment.count({
		where: "texto != ''"
	}).then(function(comments) {
		console.log("OK - Total Comentarios: " +  comments);
		res.locals.totComments = comments;
		next();
	}).catch(function(error) { next(error); });

}

// Total de preguntas con/sin comentarios
// Nota el número medio lo calculo directamente en stats.ejs
exports.comentadas = function(req, res, next) {

	res.locals.sc = 0;
	res.locals.cc = 0;
	var j = 1;  

	for (var i = 1; i <= res.locals.totQuizes ; i++ ) {

		models.Comment.count({
			where: "id = " + i
		}).then(function(qid) {
			console.log("OK - Total QID (" + j++ +"): " + qid);
			if (qid === 0) res.locals.sc++; else res.locals.cc++;
			res.render("stats", { errors: [] });
		}).catch(function(error) { next(error); });
	}

};

