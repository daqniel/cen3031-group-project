/* Dependencies */
var specials_controller = require("../controllers/special.controller.js"),
    express = require("express"),
    router = express.Router();

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */

router
    .route("/")
    .get(specials_controller.getNewOrOld, specials_controller.list)
    .post(specials_controller.create);

router
  .route("/:_id")
  .get(specials_controller.read) /* Maybe don't need this get by id */
  .put(specials_controller.update)
  .delete(specials_controller.delete);


module.exports = router;

