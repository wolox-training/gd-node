const userSignUpTest = {
  first_name: 'Tom',
  last_name: 'Lee',
  email: 'Tom.Lee@wolox.com',
  password: '12345rE8',
  role_id: 'regular'
};

const userSignUpTestEmpty = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role_id: ''
};

const userSignInTest = {
  email: 'Tom.Lee@wolox.com',
  password: '12345rt8'
};

module.exports = {
  userSignUpTest,
  userSignUpTestEmpty,
  userSignInTest
};
