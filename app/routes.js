const { healthCheck } = require('./controllers/healthCheck');
const validate = require('./middlewares/validateUser');
const { createUser } = require('./controllers/createUser');

exports.init = app => {
  app.get('/health', healthCheck);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
  app.post('/users', validate, createUser);
};
