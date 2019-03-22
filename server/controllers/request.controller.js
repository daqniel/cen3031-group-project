/*Dependencies*/
var mongoose = require('mongoose'),
    Request = require('../models/request.model.js');

/*Retrieve all Requests*/
exports.list = function(req, res) {
    /* Your code here */
    Request.find({}, function(err, requests){
        if (err) res.status(404).send(err);
        res.json(requests);
        console.log('All requests retrieved.');
    });
};

/*Create a Request*/
exports.create = function(req, res){
    /*Instantiate a Request*/
    var request = new Request(req.body);
    /*Saves Request to database*/
    request.save(function(err){
        if(err){
            console.log(err);
            res.status(400).send(err);
        }else{
            res.json(request);
        }
    });
};

/*Show current Requests*/
exports.read = function(req, res){
    res.json(req.requests);
};

/*Update Request*/
exports.update = function(req, res){
    /*Finds and updates Request based on passed parameter*/
    Request.findOneAndUpdate(req.params, req.body, function(err, updatedRequest){
        if(err){
            res.send(404).send(err);
        }else{
            res.json(updatedRequest);
        }
    });
};

/*Delete Request*/
exports.delete = function(req, res){
    /*Finds and deletes Request based on passed parameter*/
    Request.findOneAndUpdate(req.params, function(err, deletedRequest){
        if(err){
            res.status(404).send(err);
        }else deletedRequest.remove(function(err){
            if (err){
                res.status(400).send(err);
            }
            console.log("Request deleted.");
            res.json(deletedRequest);
        });
    });
};

/*Middleware: Find Request by User's Email*/
exports.findByClient = function(req, res, next) {
    Request.find({"email" : req.query.clientID}).exec((err, requests) => {
        if(err) {
            res.status(400).send(err);
        } else {
            req.requests = requests;
            next();
        }
    });
};

/*Middleware: Find Request by RequestID*/
exports.findRequestByID = function(req, res, next) {
    Request.findOne(req.params.requestID).exec(function(err, request) {
        if(err) {
            res.status(400).send(err);
        } else {
            req.requests = request;
            next();
        }
    });
};

/*Middleware: Find Request by User's Email*/
// exports.findRequestsByUser = function(req, res, next) {
//     Request.find(req.params.clientID).exec(function(err, request) {
//         if(err) {
//             res.status(400).send(err);
//         } else {
//             req.requests = requests;
//             next();
//         }
//     });
// };




