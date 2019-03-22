/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var noteSchema = new Schema({
    type: {
        type: String,
        enum: ['Client', 'Vendor', 'Request'],
        required: true
    }, //type of note: "Client","Vendor","Request"
    title: String, //heading
    text: String, //body of note
    createdDate: Date,
    updatedDate: Date
});

/* validate note integrity */
noteSchema.pre('validate', function (next) {
    if (!this.title && !this.text) {
        var err = new Error("Note validation failed: Both title and text are empty.");
        next(err);
    } else {
        next();
    }
});

/* add date fields */
noteSchema.pre('save', function (next) {

    this.updatedDate = new Date;
    if (!this.createdDate) {
        this.createdDate = new Date;
    }
    next();
});

/* Use your schema to instantiate a Mongoose model */
var Note = mongoose.model('Note', noteSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Note;