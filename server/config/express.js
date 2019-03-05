var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes');

module.exports.init = function() {
  /* db connect */
  mongoose.connect(config.db.uri);

  /* init app */
  const app = express();

  //enable request logging for development debugging
  // app.use(morgan('dev')); 

  //body parsing middleware
  // app.use(bodyParser.json());

  // Set static folder */
    app.use(express.static('client'));
    
    console.log("testing");

  // Use the listings router for requests to the api */
    app.use('/api/listings', listingsRouter);

  // Go to homepage for all routes not specified */
    app.get('*', function(req, res){
        res.redirect('/');
    });
  return app;
};
