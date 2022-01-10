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

    await queryInterface.bulkInsert('posts', [
      {
        content: "guys, I'm looking for a perfume, but I don't know name1",
        user_id: 1,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        content: "guys, I'm looking for a perfume, but I don't know name2",
        user_id: 1,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        content: "guys, I'm looking for a perfume, but I don't know name3",
        user_id: 1,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        content: "guys, I'm looking for a perfume, but I don't know nam4e",
        user_id: 1,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        content: "guys, I'm looking for a perfume, but I don't know name5",
        user_id: 1,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        content: "guys, I'm looking for a perfume, but I don't know name6",
        user_id: 1,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        content: "guys, I'm looking for a perfume, but I don't know name7",
        user_id: 1,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        content: "guys, I'm looking for a perfume, but I don't know name8",
        user_id: 1,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        content: "guys, I'm looking for a perfume, but I don't know name9",
        user_id: 1,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        content: "guys, I'm looking for a perfume, but I don't know name10",
        user_id: 1,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        content: "guys, I'm looking for a perfume, but I don't know name11",
        user_id: 1,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        content: "guys, I'm looking for a perfume, but I don't know name12",
        user_id: 1,
        created_at: new Date,
        updated_at: new Date,
      },

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
