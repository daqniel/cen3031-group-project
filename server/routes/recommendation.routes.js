/* Dependencies */
var recommendation_controller = require('../controllers/recommendation.controller.js'),
    express = require('express'),
    router = express.Router();

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
*/

router.use('/', recommendation_controller.findRecommendationsByClient)
router.route('/')
    .get(recommendation_controller.list)
    .post(recommendation_controller.create);

router.route('/:recommendationID')
    .get(recommendation_controller.read)
    .put(recommendation_controller.update)
    .delete(recommendation_controller.delete);

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle
  requests with a parameter.

  It will then pass control to the routing function specified above, where it will either
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */

router.param('recommendationID', recommendation_controller.findRecommendationByID);

module.exports = router;