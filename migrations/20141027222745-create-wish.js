"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Wishes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.INTEGER
      },
      illness: {
        type: DataTypes.STRING
      },
      wish: {
        type: DataTypes.TEXT
      },
      summary: {
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Wishes").done(done);
  }
};