// Creación de la tabla para comentarios
//
// Estructura de la tabla: 
//
// ------------------------
// | id |      texto      |
// ------------------------
//

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
		'Comment', 
		{ texto: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta comentario"}}
		}
	});
}