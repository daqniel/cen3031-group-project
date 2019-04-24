/* Dependencies */
var user_controller = require("../controllers/user.controller.js"),
  express = require("express"),
  passport = require("passport"),
  router = express.Router();

/* Read all users, Create new user */
router
  .route("/")
  .get(user_controller.list)
  .post(user_controller.create);

/* Read/Update/Delete user via email */
router
  .route("/:email")
  .get(user_controller.read)
  .put(user_controller.update)
  .delete(user_controller.delete);

/* Authenticates user, creates session */
router
  .route("/login")
  .post(passport.authenticate("local"), user_controller.postAuth);

/* destroys session */
// router.route("/logout").get(user_controller.logout);

module.exports = router;
