/* Dependencies */
var Vendor = require("../models/vendor.model.js");

/* Create a Vendor */
exports.create = function (req, res) {
  var vendor = new Vendor(req.body);

  /* save to mongoDB */
  vendor.save(err => {
    if (err) {
      res.status(400).send({
        Error: {
          msg: err.message,
        }
      });
    } else {
      res.json(vendor);
    }
  });
};

/* Show the current vendor */
exports.read = function (req, res) {
  res.json(req.vendor);
};

/* Update a vendor */
exports.update = function (req, res) {
  Vendor.findByIdAndUpdate(req.vendor._id, req.body, {runValidators: true} ,(err, updatedVendor) => {
    if (err) res.status(404).send(err);
    else {
      //NOTE: currently returns the old document, not the updated one.
      res.json(updatedVendor);
    }
  });
};

/* Delete a vendor */
exports.delete = function (req, res) {
  Vendor.findByIdAndRemove(req.vendor._id, (err, deletedVendor) => {
    // console.log(deletedVendor);
    if (!deletedVendor) res.status(404).send("Vendor does not exist.");
    else res.send(deletedVendor);
  });
};

/* retrieve all vendors */
exports.list = function (req, res) {
  Vendor.find({}, (err, vendor) => {
    if (err) res.status(404).send(err);
    res.json(vendor);
  });
};

/* 
  Middleware: find a vendor by ID, then pass it to the next request handler. 
 */
exports.vendorByID = function (req, res, next) {
  vendor_id = req.params.vendor_id;
  Vendor.findById(vendor_id).exec((err, vendor) => {
    if (err) res.status(404).send(err);
    else {
      req.vendor = vendor;
      next();
    }
  });
};