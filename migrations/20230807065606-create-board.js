'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Boards', {
      boardId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
<<<<<<< HEAD
=======
        allowNull: false,
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'CASCADE',
      },
      name: {
<<<<<<< HEAD
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.ENUM('red', 'blue', 'yellow', 'green'),
      },
      description: {
=======
        allowNull: false,
        type: Sequelize.STRING,
      },
      color: {
        allowNull: false,
        type: Sequelize.ENUM('red', 'blue', 'yellow', 'green'),
      },
      description: {
        allowNull: false,
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Boards');
  },
};
