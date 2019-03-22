/* Dependencies */
var Note = require("../models/note.model.js");

/* Create a Note */
exports.create = function (req, res) {
  var note = new Note(req.body);

  /* save to mongoDB */
  note.save(err => {
    if (err) {
      res.status(400).send({
        Error: {
          msg: err.message,
        }
      });
    } else {
      res.json(note);
    }
  });
};

/* Show the current note */
exports.read = function (req, res) {
  res.json(req.note);
};

/* Update a note */
exports.update = function (req, res) {
  Note.findByIdAndUpdate(req.note._id, req.body, (err, updatedNote) => {
    if (err) res.send(404).send(err);
    else {
      //NOTE: currently returns the old document, not the updated one.
      res.json(updatedNote);
    }
  });
};

/* Delete a note */
exports.delete = function (req, res) {
  Note.findByIdAndRemove(req.note._id, (err, deletedNote) => {
    // console.log(deletedNote);
    if (!deletedNote) res.status(404).send("Note does not exist.");
    else res.send(deletedNote);
  });
};

/* retrieve all notes */
exports.list = function (req, res) {
  Note.find({}, (err, note) => {
    if (err) res.status(404).send(err);
    res.json(note);
    // console.log('all notes retrieved.');
  });
};

/* 
  Middleware: find a note by ID, then pass it to the next request handler. 
 */
exports.noteByID = function (req, res, next) {
  note_id = req.params.note_id;
  Note.findById(note_id).exec((err, note) => {
    if (err) res.status(404).send(err);
    else {
      req.note = note;
      next();
    }
  });
};