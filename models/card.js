'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Column, {
        sourceKey: 'columnId',
        foreignKey: 'columnId',
      });
      this.hasMany(models.CardShare, {
        sourceKey: 'cardId',
        foreignKey: 'cardId',
      });
      this.hasMany(models.Comment, {
        sourceKey: 'cardId',
        foreignKey: 'cardId',
      });
      this.belongsTo(models.User, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
    }
  }
  Card.init(
    {
      cardId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      columnId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Column',
          key: 'columnId',
        },
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      color: {
        allowNull: false,
        type: DataTypes.ENUM('red', 'blue', 'yellow', 'green'),
      },
      dueDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Card',
    },
  );
  return Card;
};
