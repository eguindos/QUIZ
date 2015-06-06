var express = require('express');
var router = express.Router();

// Importamos el controlador de las preguntas (quiz_controller.js) 
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'QUIZ', errors: [] });
});

// Autoload de comandos con :quizId - Antes de evaluar los MWs, 
// param --> si el parámetro quizId existe en la ruta, invoca la 
// función de autoload. 

router.param('quizId', quizController.load); 

// Rutas de las preguntas y respuestas apuntando a los métodos
// que se llamarán cuando sean esas las rutas que recibimos en un GET
// Estos métodos se tiene que exportar de quiz_controller.js (ver arriba) 
//
// En versiones anteriores solo teníamos un recurso para questions y un 
// recurso para answers, porque solo había una pregunta con su respuesta
//
// En versiones con DB y múltiples preguntas, vamos a tener muchos recursos
// (en realidad un recurso por cada pregunta y otro por cada respuesta). 
// Antes accedíamos a un recurso directamente por  /quizes/questio   o
// /quizes/answers.
//
//					router.get('/quizes/question', quizController.question);
//					router.get('/quizes/answer', quizController.answer);
//
// Ahora ya no. Ahora tenemos que identificar el recurso (pregunta o 
// respuesta al que queremos acceder y darle un identificador para saber 
// a cuál estamos accediendo exactamente). Además, para ir a la ruta 
// principal de todas las podibles preguntas, creamos una nueva ruta 
// que llamaremos quizes. La regEx \\d+ es para que sean números decimales. 
// Además, index y show son nombres que se suelen dar por convenio:
router.get('/quizes',						quizController.index); 
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
router.get('/quizes/new', 					quizController.new); 
router.post('/quizes/create', 				quizController.create); 
router.get('/quizes/:quizId(\\d+)/edit',	quizController.edit);
router.put('/quizes/:quizId(\\d+)',			quizController.update);
router.delete('/quizes/:quizId(\\d+)', 		quizController.destroy);

// Créditos
router.get('/author', function(req, res) {
	res.render('author', { foto: '/images/foto.gif' });
});

module.exports = router;
