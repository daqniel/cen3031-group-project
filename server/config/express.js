var path = require("path"),
  express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  //NOTE: body-parser not needed, already built into express (express.json)
  //bodyParser = require('body-parser'),
  config = require("./config"),
  specialsRouter = require("../routes/special.routes"),
  usersRouter = require("../routes/special.routes"),
  // requestsRouter = require("../routes/request.routes"),
  // recommendationsRouter = require("../routes/recommendation.routes"),
  notesRouter = require("../routes/note.routes"),
  blogpostsRouter = require("../routes/blogpost.routes");

module.exports.init = function() {
  /* db connect */
  mongoose.connect(config.db.uri);

  /* init app */
  const app = express();

  //enable request logging for development debugging
  // app.use(morgan('dev'));

  //body parsing middleware
  app.use(express.json());

  // Set static folder */
  app.use(express.static("client"));

  // Use the listings router for requests to the api */
  app.use("/api/users", usersRouter);
  app.use("/api/specials", specialsRouter);
  // app.use("/api/requests", requestsRouter);
  // app.use("/api/recommendations", recommendationsRouter);
  app.use("/api/notes", notesRouter);
  app.use("/api/blogposts", blogpostsRouter);

  // Go to homepage for all routes not specified */
  app.get("*", function(req, res) {
    res.redirect("/");
  });
  return app;
};

