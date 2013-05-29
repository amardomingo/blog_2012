
// Definicion del modelo Fav:

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Favourites',
            { authorId: {
                 type: DataTypes.INTEGER,
                 validate: {
                     notEmpty: {msg: "El campo autor no puede estar vacio"}
                 }
              },
              postId: {
                 type: DataTypes.INTEGER,
                 validate: {
                     notEmpty: {msg: "El campo postid no puede estar vacio"}
                 }
              } 
            });
}
