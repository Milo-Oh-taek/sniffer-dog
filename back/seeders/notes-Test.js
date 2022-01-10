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

    await queryInterface.bulkInsert('notes', [
      {
        name: "bergamot",
        use_yn: "Y",
        category_id: 1,
        description: "citrusy, bitter & tart, elegant, light note with mild spicy tone, complex with nuances of fruit and aromatic elements, reminiscent of eau de Cologne, it flavors Earl Grey tea.",
        pic1: "https://2.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Acai berry",
        use_yn: "Y",
        category_id: 2,
        description: "Acai berry.",
        pic1: "https://fimg.jpg",
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
