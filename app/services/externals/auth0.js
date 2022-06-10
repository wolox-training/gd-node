const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const configAuth = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_AUTH,
  baseURL: 'http://localhost:8081',
  clientID: 'O8ywnh6QSK8oQPLjTy2frOYmqGLNPJR3',
  issuerBaseURL: 'https://dev-azjg8-fx.us.auth0.com'
};

const checkJwt = auth({
  audience: 'https://dev-azjg8-fx.us.auth0.com/api/v2/',
  issuerBaseURL: 'https://dev-azjg8-fx.us.auth0.com'
});

const checkScopes = requiredScopes('read:messages');

module.exports = {
  configAuth,
  checkJwt,
  checkScopes
};
