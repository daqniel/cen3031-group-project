/* Dependencies */
var Special = require("../models/special.model.js");

/* retrieve all specials */
exports.list = function (req, res) {
  res.json(req.specials);
};

/* Create a Special */
exports.create = function (req, res) {
  var special = new Special(req.body);

  /* save to mongoDB */
  special.save()
    .then(newSpecial => res.json(newSpecial))
    .catch(err => res.status(400).send(err));
};

/* Show the current special */
exports.read = function (req, res) {
  Special.findById(req.params)
    .then(foundSpecial => res.json(foundSpecial))
    .catch(err => res.status(400).send(err));
};

/* Update a special */
exports.update = function (req, res) {
  Special.findById(req.params)
    .then(foundSpecial => {
      foundSpecial.title = req.body.title;
      foundSpecial.text = req.body.text;
      foundSpecial.expireDate = req.body.expireDate;
      foundSpecial.save()
        .then(updatedSpecial => res.json(updatedSpecial))
        .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(400).send(err));
};

/* Delete a special */
exports.delete = function (req, res) {
  Special.findByIdAndRemove(req.params)
    .then(deletedSpecial => res.json(deletedSpecial))
    .catch(err => res.status(400).send(err));
};

/* 
  Middleware: find N specials and pass on sorted by created date,
  either newest or oldest.
 */
exports.getNewOrOld = function (req, res, next) {
  /* if order=old query param is passed, gets N oldest specials */
  var order = req.query.order == 'old' ? 1 : -1;
  Special.find()
    .sort({
      createdDate: order
    })
    .limit(parseInt(req.query.num))
    .then(foundSpecials => req.specials = foundSpecials)
    .catch(err => res.status(400).send(err))
    .then(() => next())

};