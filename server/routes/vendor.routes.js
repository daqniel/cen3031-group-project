/* Dependencies */
var vendor_controller = require('../controllers/vendor.controller.js'), 
    express = require('express'), 
    router = express.Router();

//lists all vendors made
router.route('/')
    .get(vendor_controller.list)
    .post(vendor_controller.create);

router.route('/:vendor_id')
    .get(vendor_controller.read)
    .put(vendor_controller.update)
    .delete(vendor_controller.delete);

router.param('vendor_id', vendor_controller.vendorByID);

module.exports = router;