'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CardShares', {
      cardShareId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      boardShareId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'BoardShares',
          key: 'boardShareId',
        },
        onDelete: 'CASCADE',
      },
      cardId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Cards',
          key: 'cardId',
        },
        onDelete: 'CASCADE',
      },
      invitedUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('standby', 'accept', 'cancel'),
        defaultValue: 'standby',
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
    await queryInterface.dropTable('CardShares');
  },
};
