const { healthCheck } = require('./controllers/healthCheck');
const { validateSignUp, validateSignIn, allowEndpoints } = require('./middlewares/user');
const { signUp, signIn, listAll } = require('./controllers/user');

exports.init = app => {
  app.get('/health', healthCheck);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
  app.get('/users', allowEndpoints, listAll);
  app.post('/users', validateSignUp, signUp);
  app.post('/users/sessions', validateSignIn, signIn);
};
