// Construcción de la base de datos

var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite - 
// En sequelize metemos un objeto que creamos con el módulo Sequelize
// Sequelize es la clase de bases de datos
// sequelize será nuestro objeto con la bd genérica particularizada
// para SQLite3. Y el fichero que tendrá la db es quiz.sqlite.
var sequelize = new Sequelize(null, null, null, 
					{ dialect: "sqlite", storage: "quiz.sqlite"});

// Importar la definición de la tabla Quiz de quiz.js
// El objeto de tipo Quiz podŕá así acceder a los elementos 
// de la tabla definida en quiz.js.
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Exportar la definición de la tabla Quiz
// Esto es para que se pueda importar en otros lugares de la aplicación
exports.Quiz = Quiz; 

// sequelize.sync() crea e inicializa la bd y, por tanto, la tabla de 
// preguntas de la db que es la única tabla que tenemos hasta ahora
// La forma success es la forma antigua de usar sequelize. Actualmente 
// se usa lo que se denomina "promesas". Se verán posteriormente
sequelize.sync().success(function() {

	// success ejecuta el manejador una vez creada la tabla
	// count nos da el número de filas que tiene la tabla
	Quiz.count().success(function(count) {

		// La tabla se inicializa solo si está vacía
		if(count === 0) {
			Quiz.create({ pregunta: 'Capital de Italia', 
						  respuesta: 'Roma'
			}).success(function(){ console.log('Base de datos inicializada') });
		};
	});
});