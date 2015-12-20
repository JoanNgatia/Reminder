 // app/routes.js

// grab the task model we just created
var Task = require('./models/task');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/tasks', function(req, res) {
            // use mongoose to get all tasks in the database
            Task.find(function(err, tasks) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(tasks); // return all tasks in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        app.post('/api/tasks', function(req, res){
            Task.find(function(err, tasks){
                if(err)
                    res.send(err);

                res.json({message: 'Task created'});
            });
        });
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };