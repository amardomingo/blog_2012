
// Definicion de la clase Admin:

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Admins',
      { authorId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: { msg: "El campo login no puede estar vacio" }
            }
        }
    });
}
