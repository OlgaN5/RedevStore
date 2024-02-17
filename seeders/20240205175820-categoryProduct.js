'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert('categoryProducts', [{
        categoryId: 1,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        categoryId: 2,
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
