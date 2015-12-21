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


// var Task = function(Schema,mongoose) {

//     this.Schema = Schema;
//     this.mongoose = mongoose;
//     this.Item = null;

//     this.createSchemas = function() {

//         TaskSchema = new this.Schema({
//             name: String,
//             priority: String, 
//             description: String

//         });

//        // this.Task = mongoose.model('Task',TaskSchema);
//     }

//     this.insertTask = function() {

//         var read = new this.Task({
//             name: 'read',
//             priority: 'high',
//             description: 'The secret lives of Baba Segis wives'

//         }); 

//         var call = new this.Task({
//             name: 'call',
//             priority: 'medium',
//             description: 'Call mum'

//         }); 

//         read.save();
//         call.save();
//     }

//     this.getTask = function(query,res) {

//         this.Task.find(query,function(error,output) {
//             //res.json(output);
//         });
//     }
// }

module.exports = mongoose.model('Task', TaskSchema);