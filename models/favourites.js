
// Definicion del modelo Post:

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
              },
              createdAt: {
              title: {
                 type: DataTypes.STRING,
                 validate: {
                     notEmpty: {msg: "El campo del titulo no puede estar vacio"}
                 }
              },
              updatedAt
              title: {
                 type: DataTypes.STRING,
                 validate: {
                     notEmpty: {msg: "El campo del titulo no puede estar vacio"}
                 }
              },
            });
}
