module.exports = {
  id: {
    type: 'integer',
    example: 2
  },
  first_name: {
    type: 'string',
    example: 'Tom'
  },
  last_name: {
    type: 'string',
    example: 'Lee'
  },
  email: {
    type: 'string',
    example: 'tom.lee@wolox.com'
  },
  password: {
    type: 'string',
    example: '1234Rt78'
  },
  User: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/id'
      },
      first_name: {
        $ref: '#/components/schemas/first_name'
      },
      last_name: {
        $ref: '#/components/schemas/last_name'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
