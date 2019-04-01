/*Dependencies*/
var mongoose = require('mongoose'),
    Recommendation = require('../models/recommendation.model.js');

/*Create a Recommendation*/
exports.create = function(req, res){
    /*Instantiate a Request*/
    var recommendation = new Recommendation(req.body);
    /*Saves Request to database*/
    recommendation.save(function(err){
        if(err){
            res.status(400).send(err);
        }else{
            res.json(recommendation);
        }
    });
};

/*Show current Recommendation*/
exports.read = function(req, res){
    res.json(req.recommendation);
};

/*Update Recommendation*/
exports.update = function(req, res){
    /*Finds and updates Request based on passed parameter*/
    Recommendation.findOneAndUpdate(req.params, req.body, function(err, updatedRecommendation){
        if(err){
            res.send(404).send(err);
        }else{
            res.json(updatedRecommendation);
        }
    });
};

/*Delete Recommendation*/
exports.delete = function(req, res){
    /*Finds and deletes Request based on passed parameter*/
    Recommendation.findOneAndRemove(req.params.recommendationID, (err, deletedRecommendation) => {
        if(err) {
            res.status(404).send(err);
        }
        else {
            res.json(deletedRecommendation);
        }
    });
};

/*Retrieve all Recommendations*/
exports.list = function(req, res) {
    Recommendation.find({}, function(err, recommendations){
        if (err) res.status(404).send(err);
        res.json(recommendations);
    });
};

/*Middleware: Find Recommendation by RequestID*/
exports.findRecommendationByID = function(req, res, next) {
    Recommendation.findById(req.params.recommendationID).exec(function(err, recommendation) {
        if(err) {
            res.status(400).send(err);
        } else {
            req.recommendation = recommendation;
            next();
        }
    });
};

/*Middleware: Find Recommendation by User's Email*/
exports.findRecommendationsByClient = function(req, res, next) {
    Recommendation.find({client: req.query.clientId}).exec(function(err, recommendation) {
        if(err) {
            res.status(400).send(err);
        } else {
            req.recommendation = recommendation;
            next();
        }
    });
};
