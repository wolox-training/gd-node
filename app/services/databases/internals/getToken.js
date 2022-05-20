const jwt = require('jwt-simple');

function createToken(payload) {
  const token = jwt.encode(payload, process.env.SECRET_KEY, 'HS256');
  return token;
}

module.exports = {
  createToken
};
