'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoardShare extends Model {
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
      this.belongsTo(models.Board, {
        sourceKey: 'boardId',
        foreignKey: 'boardId',
      });
      this.hasMany(models.CardShare, {
        sourceKey: 'boardShareId',
        foreignKey: 'boardShareId',
      });
    }
  }
  BoardShare.init(
    {
      boardShareId: {
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
      status: {
        allowNull: false,
        type: DataTypes.ENUM('standby', 'accept', 'cancel'),
        defaultValue: 'standby',
      },
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
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
      modelName: 'BoardShare',
<<<<<<< HEAD
    }
=======
    },
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
  );
  return BoardShare;
};
