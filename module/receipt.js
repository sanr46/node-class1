// var MongoClient = require('mongodb').MongoClient,
//     mongoUrl = 'mongodb://127.0.0.1:27017/demo',
//     db;
var express = require('express');
var bodyParser = require('body-parser');

function crudOperations() {
    // MongoClient.connect(mongoUrl, function(err, dbConn) {
    //     if (err) {
    //         // fhlog.e("mongoUrl", mongoUrl);
    //         // fhlog.e('Could not connect to MongoDB - has the data browser been upgraded? %s', err);
    //         res.status(400).send(err);
    //     }
    //     db = dbConn;
    // });
    //

    var api = new express.Router(); // Router function

    api.use(bodyParser.json({
        limit: '5mb'
    }));


    api.get('/', function(req, res) {
        res.json({"msg":"hello"});
    });


    //
    // api.get('/details', function(req, res) {
    //     res.json({"msg":"hello we are in '/details' sub route"});
    // });
    // api.post('/', function(req, res) {
    //     res.json({"msg":"hello this is post method"});
    // });

    return api;
}
module.exports = crudOperations;
