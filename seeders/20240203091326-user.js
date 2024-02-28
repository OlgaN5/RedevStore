'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
      login: 'Admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('password', 3),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      login: 'User',
      email: 'user@gmail.com',
      password: await bcrypt.hash('password', 3),
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

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