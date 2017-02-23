var MongoClient = require('mongodb').MongoClient,
    mongoUrl = 'mongodb://127.0.0.1:27017/demo',
    db;
var express = require('express');
var bodyParser = require('body-parser');
var async = require('async');

function crudOperations() {
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

    api.post('/exe1', function(req, res) {

        var parallelExe = {
            "fun1": function(AsyncCallback) {
                db.collection('simple_collection').find({
                    index: Number(req.query.id)
                }).toArray(AsyncCallback);
            },
            "func2": function(AsyncCallback) {
                db.collection('simple_collection_1').find({
                    index: Number(req.query.id)
                }).toArray(AsyncCallback);
            }
        };
        var finalcallback = function(err, response) {
            if (err) {
                console.error("error in async call", err);
                res.status(400).send(err);
            } else {

                var col = db.collection('combo_collection');
                col.insertMany([response], function(err, r) {
                    if (err) {
                        console.error("error in async call", err);
                        res.status(400).send(err);
                    }
                    res.send(r);
                });

            }
        };

        async.parallel(parallelExe, finalcallback);

        // 1st i/o
        // db.collection('simple_collection').find({
        //     index: Number(req.query.id)
        // }).toArray( // callback
        //     // error first, data or response, n.. 3rd matadata
        //
        //     function(err, response1) {
        //         if (err) {
        //             res.status(400).send(err);
        //         } else {
        //
        //             // 2nd i/o
        //             db.collection('simple_collection_1').find({
        //                 index: Number(req.query.id)
        //             }).toA
        //             rray(function(err, response2) {
        //                 if (err) {
        //                     res.status(400).send(err);
        //                 } else {
        //
        //                     var combo = {
        //                         "response1": response1,
        //                         "response2": response2
        //                     };
        //
        //                     var col = db.collection('combo_collection');
        //                     // 3rd i/o
        //                     col.insertMany([combo], function(err, r) {
        //                         res.send(r);
        //                     });
        //
        //                 }
        //
        //             });
        //             // res.send(docs);
        //         }
        //
        //     });
    });

    api.post('/', function(req, res) {
        var col = db.collection('simple_collection_1');
        col.insertMany(req.body, function(err, r) {
            res.send(r);
        });
    });


    api.get('/details', function(req, res) {
        res.json({
            "msg": "hello we are in '/details' sub route"
        });
    });
    api.post('/', function(req, res) {
        res.json({
            "msg": "hello this is post method"
        });
    });

    return api;
}
module.exports = crudOperations;
