'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'weets',
      [
        {
          content:
            'Chuck Norris protocol design method has no status, requests or responses, only commands. and other things',
          user_id: 1
        },
        {
          content:
            'Robert Deniro protocol design method has no status, requests or responses, only commands.',
          user_id: 1
        },
        {
          content:
            'Pual Harrison protocol design method has no status, requests or responses, only commands. and other things',
          user_id: 2
        },
        {
          content:
            'Downson Johnson protocol design method has no status, requests or responses, only commands.',
          user_id: 2
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('weets', null, {});
  }
};
