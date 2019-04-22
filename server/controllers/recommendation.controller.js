/*Dependencies*/
var Recommendation = require("../models/recommendation.model.js");

/*Retrieve all Recommendations*/
exports.list = function(req, res) {
  res.json(req.recommendations);
};

/*Create a Recommendation*/
exports.create = function(req, res) {
  /*Instantiate a Request*/
  var recommendation = new Recommendation(req.body);

  /*Saves Request to database*/
  recommendation
    .save()
    .then(() => res.json(recommendation))
    .catch(err => res.status(400).send(err));
};

/*Show current Recommendation*/
exports.read = function(req, res) {
  Recommendation.findById(req.params)
    .then(foundRec => res.json(foundRec))
    .catch(err => res.status(400).send(err));
};

/*Update Recommendation*/
exports.update = function(req, res) {
  Recommendation.findOne(req.params).then(foundRec => {
    foundRec.set(req.body);
    foundRec
      .save()
      .then(updatedRec => res.json(updatedRec))
      .catch(err => res.status(400).send(err));
  });
};

/* Delete a recommendation*/
exports.delete = function(req, res) {
  Recommendation.findByIdAndRemove(req.params)
    .then(deletedRec => res.json(deletedRec))
    .catch(err => res.status(400).send(err));
};

/*Middleware: Find Recommendation by User's Email*/
exports.findRecommendationsByClient = function(req, res, next) {
  var clientId = req.query.clientId;
  if(clientId) {
    Recommendation.find({client: clientId})
      .then(recs => (req.recommendations = recs))
      .catch(err => res.status(400).send(err))
      .then(() => next());
  } else {
    Recommendation.find({})
      .then(recommendations => (req.recommendations = recommendations))
      .catch(err => res.status(400).send(err))
      .then(() => next());
  }
};
