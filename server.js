// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose')

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

//route to ad a new task and save it
router.route('/tasks')
     .post(function(req, res) {
        
        var task = new Task();      
        task.name = req.body.name;  

        // save the task and check for errors
        task.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Task created!' });
        });
     });

app.use('/api', router);
//app.get('/api/:type/*/*?*', router);
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
task.createSchemas();
task.insertTask();
task.getTask({name: 'read'});

app.get('/ping', function(req, res){
    res.send({ping:'Lets do this!'});
});

app.get('/ping/:id', function(req, res){
    res.send({ping:'Hi!Your current tasks include' +req.params.id});
});

app.get('/task/read', function(req, res){
    var resp = task.getTask({name: 'Read'}, res);
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