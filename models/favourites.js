
// Definicion del modelo Fav:

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favourites',
            { userID: {
                 type: DataTypes.INTEGER,
                 validate: {
                     notEmpty: {msg: "El campo autor no puede estar vacio"}
                 }
              },
              postID: {
                 type: DataTypes.INTEGER,
                 validate: {
                     notEmpty: {msg: "El campo autor no puede estar vacio"}
                 }
              } 
            });
}
