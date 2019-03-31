/* Dependencies */
var requestController = require('../controllers/request.controller.js'),
    express = require('express'),
    router = express.Router();

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
*/

/* middleware to get requests via query param clientID */
router.use('/', requestController.findRequestsByClient)
router.route('/')
    .get(requestController.list)
    .post(requestController.create);

    /* 
    i think this should be split into two routes because
    this implementation gets a little awkward when updating.
    We would need to put both the clientID and the requestID,
    when we really only need the requestID.
    */  
// router.route('/:clientID?/:requestID?')
//     .get(requestController.read)
//     .put(requestController.update)
//     .delete(requestController.delete);

/* TODO: Decide on url params vs query params */
/* NOTE: trying to use query params for getting certain clients */
/* my implementation */
router.route('/:requestID')
    .get(requestController.read)
    .put(requestController.update)
    .delete(requestController.delete);

router.param('requestID', requestController.findRequestByID);
// router.param('clientID', requestController.findRequestsByUser);

module.exports = router;