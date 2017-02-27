var MongoClient = require('mongodb').MongoClient,
    mongoUrl = 'mongodb://127.0.0.1:27017/demo',
    db;
var express = require('express');
var bodyParser = require('body-parser');
var async = require('async');

function ticketing() {
    // var api;
    MongoClient.connect(mongoUrl, function(err, dbConn) {
        if (err) {
            // fhlog.e("mongoUrl", mongoUrl);
            // fhlog.e('Could not connect to MongoDB - has the data browser been upgraded? %s', err);
            res.status(400).send(err);
        }
        db = dbConn;
    });
    api = new express.Router(); // Router function
    api.use(bodyParser.json({
        limit: '5mb'
    }));
    // 1st fecth details from collection 1
    // 2nd fecth details from collection 2
    // combine the data
    // inster the data in to new collection

    //
    // api.post('/', function(req, res) {
    //
    //     // var parallelExe = {
    //     //     "fun1": function(AsyncCallback) {
    //     //         db.collection('simple_collection').find({
    //     //             index: Number(req.query.id)
    //     //         }).toArray(AsyncCallback);
    //     //     },
    //     //     "func2": function(AsyncCallback) {
    //     //         db.collection('simple_collection_1').find({
    //     //             index: Number(req.query.id)
    //     //         }).toArray(AsyncCallback);
    //     //     }
    //     // };
    //     // var finalcallback = function(err, response) {
    //     //     if (err) {
    //     //         console.error("error in async call", err);
    //     //         res.status(400).send(err);
    //     //     } else {
    //     //
    //     //         var col = db.collection('combo_collection');
    //     //         col.insertMany([response], function(err, r) {
    //     //             if (err) {
    //     //                 console.error("error in async call", err);
    //     //                 res.status(400).send(err);
    //     //             }
    //     //             res.send(r);
    //     //         });
    //     //
    //     //     }
    //     // };
    //     //
    //     // async.parallel(parallelExe, finalcallback);
    //
    // });

    api.post('/movies', function(req, res) {
        var col = db.collection('movies');
        col.insertMany(req.body, function(err, r) {
            res.send(r);
        });
    });


    api.get('/movies', function(req, res) {
        var col = db.collection('movies');
        col.find({
            "isActive": true
        }).project({
            "isActive": 1,
            "index": 1,
            "movie": 1,
            "about": 1,
            "_id": 0
        }).toArray(function(err, docs) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(docs);
            }
        });
    });

    api.post('/', function(req, res) {
        var col = db.collection('ticket');
        col.insertMany(req.body, function(err, r) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(r);
            }
        });
    });
    api.get('/', function(req, res) {
      console.log("req.query.showtime",req.query.showtime);
        var col = db.collection('ticket');
        col.find({
            // "movieId": Number(req.query.movieid)?Number(req.query.movieid):0,
            "showtime":req.query.showtime
        }).project({
            "movieId": 1,
            "showTime": 1,
            "movie": 1,
            "noPeople": 1,
            "_id": 0
        }).toArray(function(err, docs) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(docs);
            }
        });
    });


    return api;
}
module.exports = ticketing;
