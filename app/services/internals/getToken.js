const jwt = require('jwt-simple');

function createToken(payload) {
  payload.iat = Math.round(Date.now() / 1000);
  payload.exp = Math.round(Date.now() / 1000) + 3600;
  const token = jwt.encode(payload, process.env.SECRET_KEY, 'HS256');
  return token;
}

module.exports = {
  createToken
};
