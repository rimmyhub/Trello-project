'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Column extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Board, {
        sourceKey: 'boardId',
        foreignKey: 'boardId',
      });
      this.hasMany(models.Card, {
        sourceKey: 'columnId',
        foreignKey: 'columnId',
      });
<<<<<<< HEAD
=======
      this.belongsTo(models.User, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
    }
  }
  Column.init(
    {
      columnId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      boardId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Board',
          key: 'boardId',
        },
      },
<<<<<<< HEAD
=======
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
      name: {
        allowNull: false,
        type: DataTypes.STRING,
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
      modelName: 'Column',
<<<<<<< HEAD
    }
=======
    },
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
  );
  return Column;
};
