/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var vendorSchema = new Schema({
    name: {
        type: String,
        required: true
    }, //(KEY) one name per vendor
    description: String, //what kind of company the vendor is
    phoneNumber: {
        type: String,
        validate: {

            validator: function (v) {
                /* US Phone number format, NOTE: does she use any foreign vendors?*/
                /* regex by Igor Kravtsov http://regexlib.com/REDetails.aspx?regexp_id=58 */
                return /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/.test(v);
            }
        },
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                /* unholy regex copy-pasted from stack overflow */
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            }
        }
    },
    link: {
        type: String,
        validate: {
            validator: function (v) {
                /* Validate most legal websites */
                /* regex by Viktor Nagy, http://regexlib.com/REDetails.aspx?regexp_id=2629 */
                return /^((http|https|ftp):\/\/(www\.)?|www\.)[a-zA-Z0-9\_\-]+\.([a-zA-Z]{2,4}|[a-zA-Z]{2}\.[a-zA-Z]{2})(\/[a-zA-Z0-9\-\._\?\&=,'\+%\$#~]*)*$/.test(v);
            }
        }
    },
    createdDate: Date,
    updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
vendorSchema.pre('save', function (next) {
    this.updatedDate = new Date;
    if (!this.createdDate) {
        this.createdDate = new Date;
    }
    next();
});

/* Use your schema to instantiate a Mongoose model */
var Vendor = mongoose.model('Vendor', vendorSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Vendor;