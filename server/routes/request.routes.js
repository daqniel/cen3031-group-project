/* Dependencies */
var requestController = require('../controllers/request.controller.js'),
    express = require('express'),
    router = express.Router();

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
*/

router.route('/')
    .post(requestController.create);

router.route('/:requestID?/:clientID?')
    .get(requestController.read)
    .put(requestController.update)
    .delete(requestController.delete);

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle
  requests with a parameter.

  It will then pass control to the routing function specified above, where it will either
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */

router.param('requestID', requestController.findRequestByID);
router.param('clientID', requestController.findRequestByUser);

module.exports = router;