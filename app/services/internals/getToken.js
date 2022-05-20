const jwt = require('jwt-simple');

const secret = 'ultra-secret-password';

function createToken(payload) {
  const token = jwt.encode(payload, secret, 'HS256');
  return token;
}

module.exports = {
  createToken
};
