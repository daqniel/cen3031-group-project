/* Dependencies */
var blogPost_controller = require('../controllers/blogPost.controller.js'), 
    express = require('express'), 
    router = express.Router();

//lists all blog posts made
router.route('/')
    .post(blogPost_controller.create);

router.route('/:blogID')
    .get(blogPost_controller.read)
    .put(blogPost_controller.update)
    .delete(blogPost_controller.delete);
