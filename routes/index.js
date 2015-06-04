var express = require('express');
var router = express.Router();

// Importamos el controlador de las preguntas (quiz_controller.js) 
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'QUIZ' });
});

// Rutas de las preguntas y respuestas apuntando a los métodos
// que se llamarán cuando sean esas las rutas que recibimos en un GET
// Estos métodos se tiene que exportar de quiz_controller.js (ver arriba) 
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

// Créditos
router.get('/author', function(req, res) {
	res.render('author', { foto: '/images/foto.gif' });
});

module.exports = router;
