'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [{
      name: 'product1',
      describe: 'desc',
      price: 10,
      count: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'product2',
      describe: 'desc2',
      price: 10,
      count: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};