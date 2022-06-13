const bcrypt = require('bcryptjs');

const userToTest = {
  first_name: 'tom',
  last_name: 'lee',
  email: 'tom.lee@wolox.com',
  password: bcrypt.hashSync('12345678', 10),
  role_id: 'standard'
};

const adminToTest = {
  first_name: 'john',
  last_name: 'dow',
  email: 'john.dow@wolox.com',
  password: bcrypt.hashSync('12345678', 10),
  role_id: 'administrator'
};

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

const tokenUserToTest = {
  authorization:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6InRvbSIsImxhc3RfbmFtZSI6ImxlZSIsImVtYWlsIjoidG9tLmxlZUB3b2xveC5jb20iLCJyb2xlX2lkIjoic3RhbmRhcmQifQ.usr7oetkpBXZItUmeHEOFxMwxvnG5jsJ8fg5xppUBBo'
};

const tokenAdminToTest = {
  authorization:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6ImpvaG4iLCJsYXN0X25hbWUiOiJkb3ciLCJlbWFpbCI6ImpvaG4uZG93QHdvbG94LmNvbSIsInJvbGVfaWQiOiJhZG1pbmlzdHJhdG9yIn0.IToIJAMLYgL1B2awH_-GHBCKUX1i5zSV2wfs2bQ2Y6w'
};

const sessionToTest = {
  authorization:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6InRvbSIsImxhc3RfbmFtZSI6ImxlZSIsImVtYWlsIjoidG9tLmxlZUB3b2xveC5jb20iLCJyb2xlX2lkIjoic3RhbmRhcmQiLCJpYXQiOjE2NTQ4ODQxMzUsImV4cCI6MTY1NDg4NDE5NX0.JpTaW6KLR6Yha7FwXTh1C47girIepO1JR_zYdirYW_g'
};

module.exports = {
  userToTest,
  adminToTest,
  userSignUpTest,
  userSignUpTestEmpty,
  userSignInTest,
  userSignUpAdminTest,
  tokenUserToTest,
  tokenAdminToTest,
  sessionToTest
};
