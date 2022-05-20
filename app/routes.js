const { healthCheck } = require('./controllers/healthCheck');
const { validateSignUp, validateSignIn, allowEndpoints } = require('./middlewares/user');
const { signUp, signIn, listAll } = require('./controllers/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', allowEndpoints, listAll);
  app.post('/users', validateSignUp, signUp);
  app.post('/users/sessions', validateSignIn, signIn);
  app.post('/admin/users', validateSignUp, signUp);
};
