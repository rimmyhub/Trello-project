'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Columns', {
      columnId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      boardId: {
<<<<<<< HEAD
=======
        allowNull: false,
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
        type: Sequelize.INTEGER,
        references: {
          model: 'Boards',
          key: 'boardId',
        },
        onDelete: 'CASCADE',
      },
<<<<<<< HEAD
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
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
      name: {
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
    await queryInterface.dropTable('Columns');
  },
};
