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
    .then(newRecommendation => res.json(newRecommendation))
    .catch(err => res.status(400).send(err));
};

/*Show current Recommendation*/
exports.read = function(req, res) {
  res.json(req.recommendation);
};

/*Update Recommendation*/
exports.update = function(req, res) {
  Recommendation.findById(req.params)
    .then(foundRec => {
      foundRec.client = req.body.client;
      foundRec.price = req.body.price;
      foundRec.startDate = req.body.startDate;
      foundRec.endDate = req.body.endDate;
      foundRec.text = req.body.text;
      foundRec
        .save()
        .then(updatedRec => res.json(updatedRec))
        .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(400).send(err));
};

/* Delete a recommendation*/
exports.delete = function(req, res) {
  Recommendation.findByIdAndRemove(req.params)
    .then(deletedRec => res.json(deletedRec))
    .catch(err => res.status(400).send(err));
};

/*Middleware: Find Recommendation by User's Email*/
exports.findRecommendationsByClient = function(req, res, next) {
  var query;
  if (req.query.client) {
    query = Recommendation.find({ client: req.query.client });
  } else {
    query = Recommendation.find({});
  }

  query
    .then(foundRecommendations => (req.recommendations = foundRecommendations))
    .catch(err => res.status(400).send(err))
    .then(() => next());
};
