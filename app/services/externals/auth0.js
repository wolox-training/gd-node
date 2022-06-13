const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const configAuth = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_AUTH,
  baseURL: process.env.AUTH_BASE_URL,
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_ISSUE_BASE_URL
};

const checkJwt = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUE_BASE_URL
});

const checkScopes = requiredScopes('read:messages');

module.exports = {
  configAuth,
  checkJwt,
  checkScopes
};
