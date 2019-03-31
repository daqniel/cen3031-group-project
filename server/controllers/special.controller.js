//TODO: delete, update are accessing database twice, fix if there's time.
//NOTE: this is true for a lot of the schema controllers.

/* Dependencies */
var Special = require("../models/special.model.js");

/* retrieve all specials */
exports.list = function (req, res) {
  res.json(req.special);
};

/* Create a Special */
exports.create = function (req, res) {
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
exports.read = function (req, res) {
  req.body = req.special;
  res.json(req.special);
};

/* Update a special */

exports.update = function (req, res) {
  Special.findOneAndUpdate({_id: req.params.specialID}, req.body, (err, updatedSpecial) => {
    if (err) res.status(404).send(err);
    else {
      res.json(updatedSpecial);
    }
  });
};

/* Delete a special */
exports.delete = function (req, res) {
  Special.findOneAndRemove({_id: req.params.specialID}, (err, deletedSpecial) => {
    //NOTE: There maybe a more correct way to do this
    if (!deletedSpecial) res.status(404).send("Special does not exist.");
    else res.json(deletedSpecial);
  });
};

/*
  Middleware: find a special by its ID, then pass it to the next request handler.
 */
exports.specialByID = function (req, res, next) {
  Special.findById({_id:req.params.specialID}).exec((err, special) => {
    if (err) res.status(404).send(err);
    else {
      req.special = special;
      next();
    }
  })
};

/*
  Middleware: find N specials and pass on sorted by created date,
  either newest or oldest.
 */
exports.getNewOrOld = function (req, res, next) {
  var num = req.query.num;
  /* if order=old query param is passed, gets N oldest specials */
  var order = req.query.order == 'old' ? 1 : -1;
  Special.find()
      .sort({
        createdDate: order
      })
      .limit(parseInt(num))
      .exec((err, specials) => {
        if (err) res.status(404).send(err);
        else {
          req.special = specials;
          next();
        }
      });
};