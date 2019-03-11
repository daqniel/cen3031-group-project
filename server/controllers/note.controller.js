
/* Dependencies */
var mongoose = require('mongoose'), 
    Note = require('../models/note.model.js');

/* Create a Note */
exports.create = function(req, res) {
  var note = new Note(req.body);

  /* save to mongoDB */
  note.save(err => {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(note);
    }
  });
};

/* Show the current note */
exports.read = function(req, res) {
  req.body = req.note;
  res.json(req.note);
};

/* Update a note */
exports.update = function(req, res) {
  Note.findOneAndUpdate(req.params, req.body, (err, updatedNote) => {
    if(err) res.send(404).send(err);
    else{
      res.json(updatedNote);
    }
  });
};

/* Delete a note */
exports.delete = function(req, res) {
  Note.findOneAndRemove(req.params, (err, deletedNote) =>{
    console.log(deletedNote);
    if (!deletedNote) res.status(404).send("Note does not exist.");
    else res.send(deletedNote);
  });
};


/* retrieve all notes */
exports.list = function(req, res){
    Note.find({}, (err, note) => {
        if (err) res.status(404).send(err);
        res.json(note);
        console.log('all notes retrieved.');
    });
};

/* 
  Middleware: find a note by ID, then pass it to the next request handler. 
 */
exports.noteByID = function(req, res, next, ID) {
  Note.findOne(req.params).exec((err, note) => {
    if(err) res.status(404).send(err);
    else {
      req.note = note;
      next();
    }
  });
};
