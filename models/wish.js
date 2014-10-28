"use strict";

module.exports = function(sequelize, DataTypes) {
  var Wish = sequelize.define("Wish", {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    illness: DataTypes.STRING,
    wish: DataTypes.TEXT,
    summary: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Wish;
};
