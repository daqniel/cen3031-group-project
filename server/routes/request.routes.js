/* Dependencies */
var request_controller = require('../controllers/request.controller.js'), 
    express = require('express'), 
    router = express.Router();

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
router.route('/')
    .get(request_controller.list)
    // .post(request_controller.create);
    .post(request_controller.create);
/*
  The ':' specifies a URL parameter. 
 */
//NOTE: I think we should just use the email,
//      no need for a requestname.
// router.route('/:requestname')
//   .get(request_controller.read)
//   .put(request_controller.update)
//   .delete(request_controller.delete);

router.route('/:email')
  .get(request_controller.read)
  .put(request_controller.update)
  .delete(request_controller.delete);

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle 
  requests with a parameter.

  Say we make an example request to '/request_controller/566372f4d11de3498e2941c9'

  The request handler will first find the specific listing using this 'request_controllerById' 
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database, 
  and bind this listing to the request object.

  It will then pass control to the routing function specified above, where it will either 
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */
router.param('email', request_controller.requestByEmail);

module.exports = router;
