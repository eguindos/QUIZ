var express = require('express');
var router = express.Router();

// Importamos el controlador de las preguntas 
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'QUIZ' });
});

// Rutas de las preguntas y respuestas apuntando a los métodos
// que se llamarán cuando sean esas las rutas que recibimos en un GET
// Estos métodos se tiene que exportar en quiz_controller 
router.get('/quizes/question', quizController.question)
router.get('/quizes/answer', quizController.answer)

module.exports = router;
