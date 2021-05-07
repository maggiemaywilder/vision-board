'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Board.hasMany(models.Note);

      Board.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  };
  Board.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    topic: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};