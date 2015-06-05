// Definición del modelo de QUIZ
//
// Lo que hacemos es dar la estructura 
// o formato de nuestra Tabla de Preguntas
//
// Tendremos 2 campos de tipo string y el campo por defecto
// de id. También podrían tener updateat y createdat
//
//-----------------------------------
//| id | pregunta    | respuesta    |
//-----------------------------------

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz', 
		{ pregunta:  DataTypes.STRING,
		  respuesta: DataTypes.STRING,
		});
}