/* Dependencies */
var request_controller = require('../controllers/request.controller.js'),
    express = require('express'),
    router = express.Router();

/* middleware to get requests via query param clientID */
router.route('/')
    .get(request_controller.findRequestsByClient, request_controller.list)
    .post(request_controller.create);

router.route('/:_id')
    .get(request_controller.read)
    .put(request_controller.update)
    .delete(request_controller.delete);

module.exports = router;