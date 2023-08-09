'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Board, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.BoardShare, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.Comment, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
<<<<<<< HEAD
=======

      this.hasMany(models.RefreshToken, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.Column, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.Card, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
    }
  }
  User.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      introduction: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      userImage: {
        allowNull: true,
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
      modelName: 'User',
<<<<<<< HEAD
    }
=======
    },
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
  );
  return User;
};
