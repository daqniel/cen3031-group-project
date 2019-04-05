const path = require('path'),
  express = require('express'),
  session = require('express-session'),
  mongoose = require('mongoose'),
  passport = require('passport');

const specialsRouter = require('../routes/special.routes'),
  usersRouter = require('../routes/user.routes'),
  requestsRouter = require('../routes/request.routes'),
  recommendationsRouter = require('../routes/recommendation.routes'),
  notesRouter = require('../routes/note.routes'),
  blogpostsRouter = require('../routes/blogpost.routes'),
  vendorsRouter = require('../routes/vendor.routes');

const config = require('./config');

module.exports.init = function() {
  /* db connect */
  mongoose.connect(config.db.uri, {dbName: 'BochittoTravelDB', useNewUrlParser: true}, err => {
    if(err) console.log("couldn't connect to DB: ", err);
  });

  /* init app */
  const app = express();

  /* Passport config */
  require('./passport')(passport);

  //body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // Express Session
  app.use(session({
    secret: 'sekeret',
    resave: true,
    saveUninitialized: true
  }));

  // PassportJS
  app.use(passport.initialize());
  app.use(passport.session());

  // Set static folder */
  app.use(express.static('client'));

  // Use the listings router for requests to the api */
  app.use('/api/users', usersRouter);
  app.use('/api/specials', specialsRouter);
  app.use('/api/requests', requestsRouter);
  app.use('/api/recommendations', recommendationsRouter);
  app.use('/api/notes', notesRouter);
  app.use('/api/blogposts', blogpostsRouter);
  app.use('/api/vendors', vendorsRouter);

  // Go to homepage for all routes not specified */
  app.get('*', function(req, res) {
    res.redirect('/');
  });
  return app;
};

