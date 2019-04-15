/* Dependencies */
var vendor_controller = require('../controllers/vendor.controller.js'), 
    express = require('express'), 
    router = express.Router();

//lists all vendors made
router.route('/')
    .get(vendor_controller.list)
    .post(vendor_controller.create);

router.route('/:_id')
    .get(vendor_controller.read)
    .put(vendor_controller.update)
    .delete(vendor_controller.delete);

module.exports = router;