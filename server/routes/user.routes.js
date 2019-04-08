/* Dependencies */
var user_controller = require("../controllers/user.controller.js"),
  express = require("express"),
  passport = require("passport"),
  router = express.Router();

router
  .route("/")
  .get(user_controller.list)
  .post(user_controller.create);

router
  .route("/login")
  .post(passport.authenticate("local"), user_controller.postAuth);

router.route("/:email/:password").get(user_controller.readWithPassword);

router
  .route("/:email")
  .get(user_controller.read)
  .put(user_controller.update)
  .delete(user_controller.delete);

router.param("email", user_controller.userByEmail);

module.exports = router;
