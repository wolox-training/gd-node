const { requiresAuth } = require('express-openid-connect');
const { healthCheck } = require('./controllers/healthCheck');
const { validateSignUp, validateSignIn, isStandardUser, isAdminUser } = require('./middlewares/user');
const { validateQualifyWeet } = require('./middlewares/qualification');
const { signUp, signIn, listAllUsers, signUpOrUpdateAdmin, destroySession } = require('./controllers/user');
const { createWeet, listAllWeets } = require('./controllers/weet');
const { createQualifyWeet } = require('./controllers/qualifications');
const { checkJwt } = require('./services/externals/auth0');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', checkJwt, listAllUsers);
  app.post('/users', validateSignUp, signUp);
  app.get('/users/login', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });
  app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });
  app.post('/users/sessions', validateSignIn, signIn);
  app.post('/users/sessions/invalidate_all', isStandardUser, destroySession);
  app.post('/admin/users', isAdminUser, validateSignUp, signUpOrUpdateAdmin);
  app.get('/weets', isStandardUser, listAllWeets);
  app.post('/weets', isStandardUser, createWeet);
  app.post('/weets/:id/ratings', isStandardUser, validateQualifyWeet, createQualifyWeet);
};
