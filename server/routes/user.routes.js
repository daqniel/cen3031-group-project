/* Dependencies */
var user_controller = require('../controllers/user.controller.js'), 
    express = require('express'), 
    router = express.Router();

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
router.route('/')
    .get(user_controller.list)
    // .post(user_controller.create);
    .post(user_controller.create);

//FIXME: this is the default route rn for some reason, password isn't optional
router.route('/:email/:password')
    .get(user_controller.readWithPassword)
/*
  The ':' specifies a URL parameter. 
 */
//NOTE: I think we should just use the email,
//      no need for a username.
// router.route('/:username')
//   .get(user_controller.read)
//   .put(user_controller.update)
//   .delete(user_controller.delete);

router.route('/:email')
  .get(user_controller.read)
  .put(user_controller.update)
  .delete(user_controller.delete);

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle 
  requests with a parameter.

  Say we make an example request to '/user_controller/566372f4d11de3498e2941c9'

  The request handler will first find the specific listing using this 'user_controllerById' 
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database, 
  and bind this listing to the request object.

  It will then pass control to the routing function specified above, where it will either 
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */
router.param('email', user_controller.userByEmail);
//router.param('password', user_controller.validatePassword);

module.exports = router;
