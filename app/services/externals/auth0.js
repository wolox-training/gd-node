const configAuth = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_AUTH,
  baseURL: 'http://localhost:8081',
  clientID: 'O8ywnh6QSK8oQPLjTy2frOYmqGLNPJR3',
  issuerBaseURL: 'https://dev-azjg8-fx.us.auth0.com'
};

module.exports = {
  configAuth
};
