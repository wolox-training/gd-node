const { healthCheck } = require('./controllers/healthCheck');
const { validateUser } = require('./middlewares/user');
const { createUser } = require('./controllers/user');

exports.init = app => {
  app.get('/health', healthCheck);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
  app.post('/users', validateUser, createUser);
};
