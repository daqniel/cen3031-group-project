/*Dependencies*/
var mongoose = require('mongoose'),
    Request = require('../models/request.model.js');

/*Retrieve all Requests*/
exports.list = function(req, res) {
    /* Your code here */
    Request.find({}, function(err, requests){
        if (err) res.status(404).send(err);
        res.json(requests);
    });
};

/*Create a Request*/
exports.create = function(req, res){
    /*Instantiate a Request*/
    var request = new Request(req.body);
    /*Saves Request to database*/
    request.save(function(err){
        if(err){
            res.status(400).send(err);
        }else{
            res.json(request);
        }
    });
};

/*Show current Requests*/
exports.read = function(req, res){
    res.json(req.request);
};

/*Update Request*/
exports.update = function(req, res){
    /*Finds and updates Request based on passed parameter*/
    Request.findOneAndUpdate({_id: req.params.requestID}, req.body, function(err, updatedRequest){
        if(err){
            res.send(404).send(err);
        }else{
            res.json(updatedRequest);
        }
    });
};

/*Delete Request*/
exports.delete = function(req, res){
 Request.findOneAndRemove(req.params.requestID, (err, deletedSpecial) => {
     if(err) {
         res.status(404).send(err);
     }
     else {
         res.json(deletedSpecial);
     }
  });
};


/*Middleware: Find Request by RequestID*/
exports.findRequestByID = function(req, res, next) {
    Request.findById(req.params.requestID).exec(function(err, request) {
        if(err) {
            res.status(400).send(err);
        } else {
            req.request = request;
            next();
        }
    });
};

/*Middleware: Find Request by client Email*/
exports.findRequestsByClient = function(req, res, next) {
    Request.find({clientID: req.query.clientID}).exec(function(err, request) {
        if(err) {
            res.status(400).send(err);
        } else {
            req.request = request;
            next();
        }
    });
};