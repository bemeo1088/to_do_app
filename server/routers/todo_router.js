var express = require('express');
var router = express.Router();
// var poolModule = require('../modules/pool.js');
// var pool = poolModule;
var pg = require('pg');


var taskCollection = []; // <-- store on the server

var config = {
    database: 'deneb', // the name of the database
    host: 'localhost', // where is your database?
    port: 5432, // the port number for you database, 5432 is the default
    max: 10, // how many connections at one time
    idleTimeoutMillis: 30000 // Close idle connections to db after
}

var pool = new pg.Pool(config);




//Record POST route
router.post('/', function (req, res) {
    var taskAdded = req.body;
    console.log('task Added', taskAdded);
    
    
    pool.connect(function (errorConnectingToDb, db, done) {

        if (errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.send(500);
        } else {
            var queryText = 'INSERT INTO "todolist" ("task") VALUES ($1);';
            db.query(queryText, [taskAdded.name], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery)
                    res.sendStatus(500);
                } else {
                    res.send(201);
                }
            }) //END QUERY
        }
    }); //END POOL

}); //END POST ROUTE



// Record GET route: http://localhost:5000/task will go here
router.get('/', function (req, res) {
    // Attempt to connect to the database
    console.log('within router GET');
    
    pool.connect(function (errorConnectingToDb, db, done) {

        if (errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            var queryText = 'SELECT * FROM "todolist";';
            db.query(queryText, function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery)
                    res.sendStatus(500);
                } else {
                    console.log("From the router get: ", result.rows);

                    res.send(result.rows);
                }
            }) //END QUERY
        }
    }); //END POOL

}); //END GET ROUTE


// DELETE Route
router.delete('/:id', function(req, res){
    var taskID = req.params.id;
    console.log('Task ID', taskID);
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            var queryText = 'DELETE FROM "todolist" WHERE "id" = $1;';
            db.query(queryText, [taskID], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery)
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }) //END QUERY
        }
    }); //END POOL

}); //END delete ROUTE
    

module.exports = router;