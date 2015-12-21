// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose')
var Task = require('./app/models/task')
// configuration ===========================================

//allow to get data from POST method    
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080; 

//Routes for the API
var router = express.Router();

//middleware for all requests
router.use(function(req, res, next){
    console.log('We are in action');
    next();
});

//first route
router.get('/', function(req, res){
    res.json({message: 'hooray!Welcome to Kumbusha!'});
});

//route to add a new task and save it
router.route('/tasks')
    //create a task at POST http://localhost:8080/api/tasks
    .post(function(req, res) {
        
      var task = new Task();      
      task.name = req.body.name;  

      // save the task and check for errors
      task.save(function(err) {
          if (err)
            res.send(err);

          res.json({ message: 'Task created!' });
      });
    })

    //get all tasks created at GET http://localhost:8080/api/tasks
    .get(function(req, res){
      Task.find(function(err, tasks) {
        if(err)
          res.send(err);
        res.json(tasks);
      });
    });

//routes to get, update or delete a task
router.route('/tasks/:task_id')
  //get a task with a certain Id
  .get(function(req, res){
    Task.findById(req.params.task_id, function(err, task){
      if(err)
        res.send(err);
      res.json(task);
    });
  })

  //update task with certin id
  .put(function(req, res){
    Task.findById(req.params.task_id, function(err, task){
      if(err)
        res.send(err);
      task.name = req.body.name;

      task.save(function(err){
        if (err)
          res.send(err);

        res.json({message: 'Task updated!'});
      });
    });
  })

  //delete task with this ID
  .delete(function(req, res){
    Task.remove({
      _id: req.params.task_id
    }, function(err, task){
      if(err)
        res.send(err);

        res.json({message: 'Succcessfully deleted task!'})
    });
  });


app.use('/api', router);

// connect to our mongoDB database 
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Task = require('./app/models/task');

mongoose.connect('mongodb://localhost:27017/kumbusha'); 
var db = mongoose.connection
db.on('error', function callback () {
  console.log("Connection error");
});

db.once('open', function callback () {
  console.log("Mongo working!");
});

var task = new Task(Schema, mongoose);


app.use('/api', function(req, res){
    res.send({ping:'Lets do this!'});
});

app.use('/api/:id', function(req, res){
    res.send({ping:'Hi!Your current tasks include' +req.params.id});
});

app.use('/task/read', function(req, res){
    var resp = Task.getTask({name: 'Read'}, res);
});


// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 


// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 
app.get('/', function(req, res){
    res.render('index', {title:'Home'});
});

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;    