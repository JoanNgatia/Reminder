// app/models/remind.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var ReminderSchema = new Schema({
    name: String
})
module.exports = mongoose.model('Remind', ReminderSchema);