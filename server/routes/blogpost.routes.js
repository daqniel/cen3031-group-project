/* Dependencies */
var blogpost_controller = require('../controllers/blogpost.controller.js'), 
    express = require('express'), 
    router = express.Router();

//lists all blogposts made
router.use("/", blogpost_controller.getNewOrOld);
router.route('/')
    .get(blogpost_controller.list)
    .post(blogpost_controller.create);

router.route('/:blogpostId')
    .get(blogpost_controller.read)
    .put(blogpost_controller.update)
    .delete(blogpost_controller.delete);

router.param('blogpostId', blogpost_controller.blogpostByID);
module.exports = router;