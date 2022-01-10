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

    await queryInterface.bulkInsert('categories', [
      {
        name: "citrus",
        use_yn: "Y",
        description: "Most often by citrus in perfumery we describe the whole spectrum of hesperidic fruits (Hesperidia), named after the Hesperides, nymphs from Greek mythology.",
        pic1: "https://abc.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "fruits",
        use_yn: "Y",
        description: "Fruity notes beyond citrus (which form a class of its own) have become so popular in recent years that they deserve a category of their own. ",
        pic1: "https://abc.jpg",
        created_at: new Date,
        updated_at: new Date,
      }

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
