/* Dependencies */
var recommendController = require('../controllers/recommendation.controller.js'),
    express = require('express'),
    router = express.Router();

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
*/

router.route('/')
    .post(recommendController.create);

router.route('/:recommendID?/:clientID?')
    .get(recommendController.read)
    .put(recommendController.update)
    .delete(recommendController.delete);

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle
  requests with a parameter.

  It will then pass control to the routing function specified above, where it will either
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */

router.param('recommendID', recommendController.findRecommendationByID);
router.param('clientID', recommendController.findRecommendationByUser);

module.exports = router;