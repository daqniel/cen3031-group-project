/* Dependencies */
var blogpost_controller = require('../controllers/blogpost.controller.js'), 
    express = require('express'), 
    router = express.Router();

/* Read all blogposts, Create new blogpost */
router.route('/')
    .get(blogpost_controller.getNewOrOld, blogpost_controller.list)
    .post(blogpost_controller.create);

/* Read/Update/Delete blogpost via _id */
router.route('/:blogpostId')
    .get(blogpost_controller.read)
    .put(blogpost_controller.update)
    .delete(blogpost_controller.delete);

/* find blogpost in database via _id */
router.param('blogpostId', blogpost_controller.blogpostByID);
module.exports = router;