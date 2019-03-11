/* Dependencies */
var Special = require("../models/special.model.js");

/* Create a Special */
exports.create = function(req, res) {
  var special = new Special(req.body);

  /* save to mongoDB */
  special.save(err => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(special);
    }
  });
};

/* Show the current special */
exports.read = function(req, res) {
  req.body = req.special;
  res.json(req.special);
};

/* Update a special */

exports.update = function(req, res) {
  Special.findOneAndUpdate(req.params, req.body, (err, updatedSpecial) => {
    if (err) res.status(404).send(err);
    else {
      res.json(updatedSpecial);
    }
  });
};

// NOTE: should we do this based on created date or updated date?

exports.readOldest = function(req, res) {
Special.find()
    .sort({ createdDate: 1 })
    .limit(req.numSpecials)
    .exec((err, specials) => {
      if (err) res.status(404).send(err);
      else {
        res.json(specials);
      }
    });
};

exports.readNewest = function(req, res) {
Special.find()
    .sort({ createdDate: -1 })
    .limit(req.numSpecials)
    .exec((err, specials) => {
      if (err) res.status(404).send(err);
      else {
        res.json(specials);
      }
    });
};

/* Delete a special */
exports.delete = function(req, res) {
  Special.findOneAndRemove(req.params, (err, deletedSpecial) => {
    //NOTE: There maybe a more correct way to do this
    if (!deletedSpecial) res.status(404).send("Special does not exist.");
    else res.json(deletedSpecial);
  });
};

/* retrieve all specials */
exports.list = function(req, res) {
  Special.find({}, (err, specials) => {
    if (err) res.status(404).send(err);
    res.json(specials);
  });
};

/* 
  Middleware: find a special by its ID, then pass it to the next request handler. 
 */
exports.specialByID = function(req, res, next) {
  Special.findOne(req.params).exec((err, special) => {
    if (err) res.status(404).send(err);
    else {
      req.special = special;
      next();
    }
  });
};

exports.specialsAmount = function(req, res, next) {
  /* -1 for newest, 1 for oldest */
// Special.find()
//     .sort({ createdDate: -1 })
//     .limit(req.params.numSpecials)
//     .exec((err, specials) => {
//       if (err) res.status(404).send(err);
//       else {
//         req.specials = specials;
//         next();
//       }
//     });
req.numSpecials = parseInt(req.params.numSpecials);
next();
};
