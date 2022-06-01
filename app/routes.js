const { healthCheck } = require('./controllers/healthCheck');
const { validateSignUp, validateSignIn, isStandardUser, isAdminUser } = require('./middlewares/user');
const { validateQualificationWeet } = require('./middlewares/weet');
const { signUp, signIn, listAllUsers, signUpOrUpdateAdmin } = require('./controllers/user');
const { createWeet, listAllWeets, updateWeet } = require('./controllers/weet');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', isStandardUser, listAllUsers);
  app.post('/users', validateSignUp, signUp);
  app.post('/users/sessions', validateSignIn, signIn);
  app.post('/admin/users', isAdminUser, validateSignUp, signUpOrUpdateAdmin);
  app.get('/weets', isStandardUser, listAllWeets);
  app.post('/weets', isStandardUser, createWeet);
  app.post('/weets/:id/ratings', isStandardUser, validateQualificationWeet, updateWeet);
};
