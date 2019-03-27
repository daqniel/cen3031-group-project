/* Dependencies */
var specials_controller = require("../controllers/special.controller.js"),
  express = require("express"),
  router = express.Router();

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */

router.use("/", specials_controller.getNewOrOld);
router
  .route("/")
  .get(specials_controller.list)
  .post(specials_controller.create);
/*
  The ':' specifies a URL parameter. 
 */

router
  .route("/:specialID")
  .get(specials_controller.read) /* Maybe don't need this get by id */
  .put(specials_controller.update)
  .delete(specials_controller.delete);

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle 
  requests with a parameter.

  Say we make an example request to '/specials_controller/566372f4d11de3498e2941c9'

  The request handler will first find the specific listing using this 'specials_controllerById' 
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database, 
  and bind this listing to the request object.

  It will then pass control to the routing function specified above, where it will either 
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */
router.param("specialID", specials_controller.specialByID);

module.exports = router;
