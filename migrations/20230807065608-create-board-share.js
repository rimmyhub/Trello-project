'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BoardShares', {
      boardShareId: {
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
      status: {
        allowNull: false,
        type: Sequelize.ENUM('standby', 'accept', 'cancel'),
        defaultValue: 'standby',
      },
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
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
    await queryInterface.dropTable('BoardShares');
  },
};
