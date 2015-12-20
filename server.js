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
        
        var remind = new Remind();      
        remind.name = req.body.name;  

        // save the task and check for errors
        remind.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Task created!' });
        });
        
    });

app.use('/api', router);
app.get('/api/:type/*/*?*', router);
// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect('mongodb://localhost/kumbusha'); 

var Remind = require('./app/models/remind');


// parse application/vnd.api+json as json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 


// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
//app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
//app.use(express.static(__dirname + '/public')); 

// routes ==================================================
//require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;    