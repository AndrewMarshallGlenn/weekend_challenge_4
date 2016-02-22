var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connect = require('./connect');



router.post('/', function(req, res) {
    var addTask = {
        task: req.body.tasks
    };

    pg.connect(connect, function(err, client) {
        client.query("INSERT INTO tasks (task) VALUES ($1) RETURNING id",
            [addTask.task],
            function (err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    console.log(result);
                    res.send(result);
                }
            });
    });

});

router.delete('/', function(req, res) {
    var removeTask = {
        id: req.body.id
    };

    pg.connect(connect, function(err, client) {
        client.query("DELETE FROM tasks WHERE id = $1;",
            [removeTask.id],
            function (err, result) {
                if(err) {
                    console.log("Error deleting data: ", err);
                    res.send(false);
                } else {
                    console.log(result);
                    res.send(result);
                }
            });
    });

});

router.put('/', function(req, res) {
    var updateTask = {
        id: req.body.id
    };

    pg.connect(connect, function(err, client) {
        client.query("UPDATE tasks SET completed = 'true' WHERE id = $1;",
            [updateTask.id],
            function (err, result) {
                if(err) {
                    console.log("Error deleting data: ", err);
                    res.send(false);
                } else {
                    console.log(result);
                    res.send(result);
                }
            });
    });

});

router.get('/', function(req, res) {
    var results = [];
    pg.connect(connect, function(err, client) {
        var query = client.query('SELECT * FROM tasks ORDER BY id DESC;');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});


module.exports = router;