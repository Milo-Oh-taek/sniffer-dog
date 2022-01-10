'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [
      // {
      //   email: "oht366@gmail.com",
      //   nickname: "milo",
      //   password: "1234",
      //   use_yn: "Y",
      //   created_at: new Date,
      //   updated_at: new Date,
      // },
      // {
      //   email: "oet112@naver.com",
      //   nickname: "fold",
      //   password: "1234",
      //   use_yn: "Y",
      //   created_at: new Date,
      //   updated_at: new Date,
      // },
      // {
      //   email: "12@naver.com",
      //   nickname: "show",
      //   password: "1234",
      //   use_yn: "Y",
      //   created_at: new Date,
      //   updated_at: new Date,
      // },

    ]);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
