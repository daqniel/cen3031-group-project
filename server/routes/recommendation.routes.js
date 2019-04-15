/* Dependencies */
var recommendation_controller = require('../controllers/recommendation.controller.js'),
    express = require('express'),
    router = express.Router();

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
*/

router.route('/')
    .get(recommendation_controller.findRecommendationsByClient, recommendation_controller.list)
    .post(recommendation_controller.create);

router.route('/:_id')
    .get(recommendation_controller.read)
    .put(recommendation_controller.update)
    .delete(recommendation_controller.delete);

module.exports = router;