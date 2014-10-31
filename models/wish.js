"use strict";

module.exports = function(sequelize, DataTypes) {
  var Wish = sequelize.define("Wish", {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    illness: DataTypes.STRING,
    wish: DataTypes.TEXT,
    summary: DataTypes.TEXT,
    image: DataTypes.STRING,
    image_width: DataTypes.INTEGER,
    image_height: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      getImageDimensions: function() {
        return this.image_width + 'x' + this.image_height;
      }
    }
  });

  return Wish;
};
