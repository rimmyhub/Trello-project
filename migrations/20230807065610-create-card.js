'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      cardId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      columnId: {
<<<<<<< HEAD
=======
        allowNull: false,
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
        type: Sequelize.INTEGER,
        references: {
          model: 'Columns',
          key: 'columnId',
        },
        onDelete: 'CASCADE',
      },
<<<<<<< HEAD
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.ENUM('red', 'blue', 'yellow', 'green'),
      },
      dueDate: {
=======
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'CASCADE',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      color: {
        allowNull: false,
        type: Sequelize.ENUM('red', 'blue', 'yellow', 'green'),
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      dueDate: {
        allowNull: false,
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cards');
  },
};
