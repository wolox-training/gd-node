const { healthCheck } = require('./controllers/healthCheck');
const { validateSignUp, validateSignIn, isStandardUser, isAdminUser } = require('./middlewares/user');
const { signUp, signIn, listAll, signUpOrUpdateAdmin } = require('./controllers/user');
const { createWeet } = require('./controllers/weet');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', isStandardUser, listAll);
  app.post('/users', validateSignUp, signUp);
  app.post('/users/sessions', validateSignIn, signIn);
  app.post('/admin/users', isAdminUser, validateSignUp, signUpOrUpdateAdmin);
  app.post('/weets', isStandardUser, createWeet);
};
