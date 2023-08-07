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
        type: Sequelize.INTEGER,
        references: {
          model: 'BoardShares',
          key: 'boardShareId',
        },
        onDelete: 'CASCADE',
      },
      cardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cards',
          key: 'cardId',
        },
        onDelete: 'CASCADE',
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
