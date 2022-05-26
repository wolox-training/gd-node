const userSignUpTest = {
  first_name: 'tom',
  last_name: 'lee',
  email: 'tom.lee@wolox.com',
  password: '12345rE8',
  role_id: 'standard'
};

const userSignUpTestEmpty = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role_id: ''
};

const userSignInTest = {
  email: 'tom.lee@wolox.com',
  password: '12345rt8'
};

const userSignUpAdminTest = {
  first_name: 'tom',
  last_name: 'lee',
  email: 'tom.lee@wolox.com',
  password: '12345rE8'
};

module.exports = {
  userSignUpTest,
  userSignUpTestEmpty,
  userSignInTest,
  userSignUpAdminTest
};
