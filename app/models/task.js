// app/models/task.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our task model
// module.exports allows us to pass this to other files when it is called
var TaskSchema = new Schema({
    name: String,
    priority: String, 
    description: String
});
var Task = mongoose.model('Task', TaskSchema);

var read = new Task({
    name: 'read',
    priority: 'high',
    description: 'The secret lives of Baba Segis wives'
});

var call = new Task({
    name: 'call',
    priority: 'medium',
    description: 'Call mum'
}); 

module.exports = mongoose.model('Task', TaskSchema)