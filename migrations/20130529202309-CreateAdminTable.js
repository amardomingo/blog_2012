module.exports = {
  up: function(migration, DataTypes, done) {
   migration.createTable(
          'Admins',
         {
             id: {
                 type: DataTypes.INTEGER,
                 allowNull: false,
                 primaryKey: true,
                 autoIncrement: true,
                 unique: true
             },
             userId: {
                 type: DataTypes.INTEGER,
                 notEmpty: true,
                 unique: true
             }
          },
          { sync: {force:true}
          })
       .complete(done);
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
   
    migration.dropTable('Admins')
          .complete(done);
  }
}
