/* Dependencies */
var Vendor = require("../models/vendor.model.js");

/* Create a Vendor */
exports.create = function(req, res) {
  var vendor = new Vendor(req.body);

  /* save to mongoDB */
  vendor
    .save()
    .then(newVendor => res.json(newVendor))
    .catch(err => res.status(400).send(err));
};

/* Show the current vendor */
exports.read = function(req, res) {
  Vendor.findById(req.params)
    .then(foundVender => res.json(foundVender))
    .catch(err => res.status(400).send(err));
};

/* Update a vendor */
exports.update = function(req, res) {
  Vendor.findById(req.parmas)
    .then(foundVendor => {
      foundVendor.name = req.body.name;
      foundVendor.description = req.body.description;
      foundVendor.phoneNumber = req.body.phoneNumber;
      foundVendor.email = req.body.email;
      foundVendor.link = req.body.link;
      foundVendor
        .save()
        .then(updatedVendor => res.json(updatedVendor))
        .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(400).send(err));
};

/* Delete a vendor */
exports.delete = function(req, res) {
  Vendor.findByIdAndRemove(req.params)
    .then(deletedVendor => req.json(deletedVendor))
    .catch(err => res.status(400).send(err))
};

/* retrieve all vendors */
exports.list = function(req, res) {
  Vendor.find({})
    .then(foundVendors => res.json(foundVendors))
    .catch(err => res.status(400).send(err));
};