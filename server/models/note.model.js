/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var noteSchema = new Schema({
    // noteID: Number, //(KEY) number associated with note
    type: String, //type of note: "Client","Vendor","Request"
    title: String, //heading
    text: String, //body of note
    createdDate: Date,
    updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
noteSchema.pre('save', function(next) {
    this.updatedDate = new Date;
    if(!this.createdDate)
    {
        this.createdDate = new Date;
    }
    next();
});

/* Use your schema to instantiate a Mongoose model */
var Note = mongoose.model('Note', noteSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Note;
