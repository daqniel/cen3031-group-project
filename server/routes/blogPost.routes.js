/* Dependencies */
var blogpost_controller = require('../controllers/blogpost.controller.js'), 
    express = require('express'), 
    router = express.Router();

//lists all blogposts made
router.route('/')
    .get(blogpost_controller.list)
    .post(blogpost_controller.create);

router.route('/:blogpost_id')
    .get(blogpost_controller.read)
    .put(blogpost_controller.update)
    .delete(blogpost_controller.delete);

router.param('blogpost_id', blogpost_controller.blogpostByID);

module.exports = router;