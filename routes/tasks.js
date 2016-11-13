var express = require('express');
var router = express. Router();

// mongodb connection part
var mongojs = require('mongojs');
// NOTE in below
//      1st value is from mLab "To connect using a driver"  after replacing <dbuser> and <dbpassword> with values you set up db in your mLab account
//      2nd value is array of collections you are interested in. In this case only 'tasks'
var db = mongojs('mongodb://ilker:1234@ds151117.mlab.com:51117/exp1_tasklist', ['tasks']); // 1st value from mLab "To connect using a driver"
// console.log('db:', db);

// route for api(tasks) page accepting a GET. Note it will be localhost:3000/api/tasks      because its root path was set as /api in server.js
// Get All tasks
router.get('/tasks', function(req, res, next){
	// res.send('TASK API - 2');
    db.tasks.find(function(err, tasks){
        if(err) {
            res.send(err);
        } else {
            res.json(tasks);
        }
    });
});

// Get Single task
router.get('/task/:id', function(req, res, next){
	// res.send('TASK API - 2');
    db.tasks.findOne({_id: mongojs.ObjectID(req.params.id)}, function(err, task){
        if(err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
});

// Save task
router.post('/task', function(req, res, next) {
    // TODO deleteMe block
    // console.log('POST req:' + req);
    // console.log('POST req.body:' + req.body);
    console.log('JSON.stringify(req.body):' + JSON.stringify(req.body));

    var task = req.body;
    console.log('JSON.stringify(task):' + JSON.stringify(task));
    
    // if(!task.title || (task.isDone + '')) {          // NOTE this is wrong, always returns true
    if(!task.title || task.isDone === undefined) {
    // if(!task.title || (typeof task.isDone === 'undefined')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function(err, task){
            if(err) {
                res.send(err);
            } else {
                res.json(task);
            }
        });
    }
});

// Get Single task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectID(req.params.id)}, function(err, task){
        if(err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
});

// Update Single task
router.put('/task/:id', function(req, res, next){
	var task = req.body;
    var updTask = {};
    
    if(task.title) {
        updTask.title = task.title;
    }
    if(task.isDone !== undefined) {
        updTask.isDone = task.isDone;
    }
    
    if(!updTask){
        res.status(400);
        res.json({"error": "Bad Data"});
    } else {
        db.tasks.update({_id: mongojs.ObjectID(req.params.id)}, updTask, {}, function(err, task){
            if(err) {
                res.send(err);
            } else {
                res.json(task);
            }
    });
        
    }
    
});


// export router so that we can access this from other files
module.exports = router;
