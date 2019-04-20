/*Dependencies*/
var Request = require("../models/request.model.js");

/*Retrieve all Requests*/
exports.list = function(req, res) {
  res.json(req.requests);
};

/*Create a Request*/
exports.create = function(req, res) {
  var request = new Request(req.body);
  /*Saves Request to database*/
  request
    .save()
    .then(() => res.json(request))
    .catch(err => res.status(400).send(err));
};

/*Show current Requests*/
exports.read = function(req, res) {
  Request.findById(req.params)
    .then(foundReq => res.json(foundReq))
    .catch(err => res.status(400).send(err));
};

/*Update Request*/
exports.update = function(req, res) {
  /*Finds and updates Request based on passed parameter*/
  Request.findOne(req.params).then(foundReq => {
    foundReq.set(req.body);
    foundReq
      .save()
      .then(updatedRequest => res.json(updatedRequest))
      .catch(err => res.status(400).send(err));
  });
};

/*Delete Request*/
exports.delete = function(req, res) {
  Request.findByIdAndRemove(req.params)
    .then(deletedRequest => res.json(deletedRequest))
    .catch(err => res.status(400).send(err));
};

/*Middleware: Find Request by client Email*/
exports.findRequestsByClient = function(req, res, next) {
  var clientId = req.query.clientId;
  if (clientId) {
    Request.find({ clientId: clientId })
      .then(requests => (req.requests = requests))
      .catch(err => res.status(400).send(err))
      .then(() => next());
  } else {
    Request.find({})
      .then(requests => (req.requests = requests))
      .catch(err => res.status(400).send(err))
      .then(() => next());
  }
};
