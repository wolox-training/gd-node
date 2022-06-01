'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'qualifications',
      [
        {
          rating_user_id: 1,
          weet_id: 1,
          score: 1
        },
        {
          rating_user_id: 0,
          weet_id: 2,
          score: -1
        },
        {
          rating_user_id: 1,
          weet_id: 3,
          score: 1
        },
        {
          rating_user_id: 1,
          weet_id: 4,
          score: 1
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('qualifications', null, {});
  }
};
