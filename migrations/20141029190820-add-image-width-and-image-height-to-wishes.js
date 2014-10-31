"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn(
    	'Wishes',
    	'image_width',
    	DataTypes.INTEGER
    );
    migration.addColumn(
    	'Wishes',
    	'image_height',
    	DataTypes.INTEGER
    );
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn(
    	'Wishes',
    	'image_width'
    );
    migration.removeColumn(
    	'Wishes',
    	'image_height'
    );
    done();
  }
};
