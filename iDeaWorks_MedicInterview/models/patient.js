/*************
 * Includes
 *************/
    var mongoose     = require('mongoose');
    var schema = mongoose.Schema;

/*************
 * Schema
 *************/
    var patientSchema = schema({
        first_name: String,
        middle_name: String,
        last_name: String,
        address: String,
        ohc_number: String,
        date_of_birth: Date,
        gender: String,
        generic_notes: String
    });

/*************
 * Export
 *************/
    module.exports = mongoose.model('patients', patientSchema);
