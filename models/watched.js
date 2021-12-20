'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class watched extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.watched.belongsTo(models.user)
    }
  };
  watched.init({
    userId: DataTypes.INTEGER,
    animeId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'watched',
  });
  return watched;
};