'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardShare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
      this.belongsTo(models.Card, {
        sourceKey: 'cardId',
        foreignKey: 'cardId',
      });
    }
  }
  CardShare.init(
    {
      cardShareId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
      cardId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Card',
          key: 'cardId',
        },
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
      modelName: 'CardShare',
    },
  );
  return CardShare;
};
