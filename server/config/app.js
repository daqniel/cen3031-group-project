var config = require('./config'), 
    mongoose = require('mongoose'),   
    express = require('./express');

module.exports.start = function() {
  var app = express.init();
  app.listen(process.env.PORT || 8080, function() {
    console.log('App listening on port', process.env.PORT || 8080);
  });
};
