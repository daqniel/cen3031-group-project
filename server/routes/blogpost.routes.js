/* Dependencies */
var blogpost_controller = require('../controllers/blogpost.controller.js'), 
    express = require('express'), 
    router = express.Router();

/* Read all blogposts, Create new blogpost */
router.route('/')
    .get(blogpost_controller.getNewOrOld, blogpost_controller.list)
    .post(blogpost_controller.create);

/* Read/Update/Delete blogpost via _id */
router.route('/:_id')
    .get(blogpost_controller.read)
    .put(blogpost_controller.update)
    .delete(blogpost_controller.delete);

module.exports = router;